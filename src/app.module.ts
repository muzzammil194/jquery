import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import * as dotenv from "dotenv";
dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env["DB_HOST"] ,
    port: parseInt(process.env["DB_PORT"] ),
    username: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    entities: ["dist/**/*{.ts,.js}"],
    autoLoadEntities: false,
    synchronize: false
  }),MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
