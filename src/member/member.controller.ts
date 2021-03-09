import { Controller, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { Get } from '@nestjs/common';

@Controller('member')
export class MemberController {
  constructor(private readonly service: MemberService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<object> {
    try {
      return this.service.findOne(id);
    } catch (error) {
      return error;
    }
  }

 
}
