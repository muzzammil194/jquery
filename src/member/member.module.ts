import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { F02Members } from 'src/entities/F02Members';
import { Co01Vaccination } from 'src/entities/Co01Vaccination';
import { D01Vaccines } from 'src/entities/D01Vaccines';
import { Ms01Otp } from 'src/entities/Ms01Otp';

@Module({
  imports: [ TypeOrmModule.forFeature([F02Members]),
  TypeOrmModule.forFeature([Co01Vaccination]),
  TypeOrmModule.forFeature([D01Vaccines]),
  TypeOrmModule.forFeature([Ms01Otp])],
  providers: [MemberService],
  controllers: [MemberController]
})
export class MemberModule {}
