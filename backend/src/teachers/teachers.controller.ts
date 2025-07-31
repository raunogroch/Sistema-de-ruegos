import { Controller, Get, Put, Param, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeachersService } from './teachers.service';
import { UpdatePleaStatusDto } from './dto/update-plea-status.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('courses')
  async getTeacherCourses(@Request() req) {
    return this.teachersService.getTeacherCourses(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('courses/:courseId/pleas')
  async getCoursePleas(@Param('courseId') courseId: number) {
    return this.teachersService.getCoursePleas(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('pleas/:pleaId/status')
  async updatePleaStatus(
    @Param('pleaId') pleaId: number,
    @Body() updatePleaStatusDto: UpdatePleaStatusDto,
  ) {
    return this.teachersService.updatePleaStatus(pleaId, updatePleaStatusDto.status);
  }
}