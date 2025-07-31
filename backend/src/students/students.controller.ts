import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentPlea } from './student-plea.entity';
import { StudentsService } from './students.service';
import { CreatePleaDto } from './dto/create-plea.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('pleas')
  async createPlea(@Body() createPleaDto: CreatePleaDto, @Request() req) {
    return this.studentsService.createPlea(createPleaDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pleas')
  async getStudentPleas(@Request() req): Promise<StudentPlea[]> {
    return this.studentsService.getStudentPleas(req.user.id);
  }
}