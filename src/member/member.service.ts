import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Co01Vaccination } from 'src/entities/Co01Vaccination';
import { D01Vaccines } from 'src/entities/D01Vaccines';
import { F02Members } from 'src/entities/F02Members';
import { Ms01Otp } from 'src/entities/Ms01Otp';
import { GenericResponse } from 'src/response_Helper/responses';
import {
  CreateErrorResponse,
  GenericErrorResponse,
  GenericSuccessResponse,
} from 'src/response_Helper/response_helper';
import { createQueryBuilder, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(F02Members)
    private memberRepository: Repository<F02Members>,
    @InjectRepository(Co01Vaccination)
    private vaccinationRepository: Repository<Co01Vaccination>,
    @InjectRepository(D01Vaccines)
    private vaccinesRepository: Repository<D01Vaccines>,
    @InjectRepository(Ms01Otp)
    private missRepository: Repository<Ms01Otp>,
  ) {}

  // get current date pass 1 otherwise get 5 extraMinute in minute of the date pass 0
  getDate(id: number): String {
    let DateTime = new Date();
    let year = DateTime.getFullYear();
    let month = DateTime.getMonth() + 1;
    let date = DateTime.getDate();
    let minutes = DateTime.getMinutes() + 2;
    let hours = DateTime.getHours();
    let seconds = DateTime.getSeconds();
    let customDateExtraMin =
      year +
      '/' +
      month +
      '/' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
    return id == 1
      ? moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      : moment(customDateExtraMin).format('YYYY-MM-DD hh:mm:ss');
  }
  // Get UID AND PHONE NUMBER OF THE USER AGAINST QR CODE
  async findOne(id: string): Promise<GenericResponse<string>> {
    try {
      let x = await this.memberRepository.findOne({
        select: ['phoneNumber', 'uid'],
        where: { qrCode: id },
      });
      // this.sendOTP(x.phoneNumber, x.uid);
      // this.UpdateOTP('569');
      this.GetUserRecords("1");
      x.phoneNumber = x.phoneNumber.replace(/\d(?=\d{4})/g, '*');
      let result =
        x === undefined
          ? GenericErrorResponse('value not exist', '')
          : GenericSuccessResponse(x.phoneNumber);
      return result;
    } catch (e) {
      CreateErrorResponse(e);
    }
  }
  // SEND OTP AND INSERT M01OTP RECORDS
  async sendOTP(
    phoneNumber: string,
    uid: string,
  ): Promise<GenericResponse<string>> {
    try {
      console.log(Math.floor(100000 + Math.random() * 900000));
      let result = await this.missRepository
        .createQueryBuilder()
        .insert()
        .into(Ms01Otp)
        .values([
          {
            memeberId: uid,
            generateTime: this.getDate(1),
            expireTime: this.getDate(0),
          },
        ])
        .execute();
      let x =
        result.generatedMaps.length == 1
          ? GenericSuccessResponse('Successfully Inserted')
          : GenericErrorResponse('UnSuccessfully Inserted', '');
      return x;
    } catch (e) {
      CreateErrorResponse(e);
    }
  }
  // UPDATE OTP FOR USER ENTER OTP BEFORE EXPIRY DATE OTHERWISE IT WILL BE FALSE THEN GENERATE OTHER OTP AND ONLY 5 ATTEMPS
  async UpdateOTP(id: string): Promise<GenericResponse<string>> {
    try {
      let eTime = await this.missRepository.findOne({
        select: ['expireTime'],
        where: { id: id },
      });
      let a =
        moment(this.getDate(1).toString()).format('YYYY-MM-DD hh:mm:ss') >=
        moment(eTime.expireTime).format('YYYY-MM-DD hh:mm:ss')
          ? 0
          : moment(this.getDate(1).toString()).format('YYYY-MM-DD hh:mm:ss') ===
            moment(eTime.expireTime).format('YYYY-MM-DD hh:mm:ss')
          ? 0
          : 1;
      console.log(this.getDate(1));
      let result = await this.missRepository
        .createQueryBuilder()
        .update(Ms01Otp)
        .set({
          consumeTime: this.getDate(1),
          consumeRequest: uuid(),
          transactionId: a,
          noOfTries:5
        })
        .where('id = :id', { id: id })
        .execute();
      let x =
        result.generatedMaps.length == 1
          ? GenericSuccessResponse('Successfully Updated')
          : GenericErrorResponse('UnSuccessfully Updated', '');
      return x;
    } catch (e) {
      CreateErrorResponse(e);
    }
  }
  async GetUserRecords(id: string): Promise<GenericResponse<string>> {
    try {
      // SELECT 
      // JSON_UNQUOTE(JSON_EXTRACT(d01.name, "$.en")) as vaccine_name,
      // co01.vaccinated_on,
      // JSON_UNQUOTE(JSON_EXTRACT(d01.name, "$.en")) as dependent_on,
      // d01.dependent_duedate 
      // FROM f02_members as f02
      // INNER JOIN  co01_vaccination as co01 on co01.member_id=f02.uid
      // INNER JOIN  d01_vaccines  as d01 on d01.uid=co01.vaccine_id
      // where f02.uid="5153642a8fe3495b93ab12b0ada4cf3a";

      let result = await createQueryBuilder(D01Vaccines)
        .select([
          'D01Vaccines.name',
          'Co01Vaccination.vaccinatedOn',
          'D01Vaccines.dependentOn',
          '.D01Vaccines.dependentDuedate',
        ])
        .innerJoin('D01Vaccines.uid', 'Co01Vaccination.vaccineId')
        .innerJoin('Co01Vaccination.memberId', 'F02Members.uid')
        .where('user.name = :name', { name: 'Timber' })
        .getOne();
      console.log(result);
      let x = result
        ? GenericSuccessResponse('Successfully Updated')
        : GenericErrorResponse('UnSuccessfully Updated', '');
      return x;
    } catch (e) {
      CreateErrorResponse(e);
    }
  }
}
