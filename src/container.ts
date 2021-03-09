import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Co01Vaccination } from './entities/Co01Vaccination';
import { D01Vaccines } from './entities/D01Vaccines';
import { F02Members } from './entities/F02Members';
import { Ms01Otp } from './entities/Ms01Otp';

@Injectable()
export class AppService {
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
}
