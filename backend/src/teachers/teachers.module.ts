import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { Course } from '../courses/course.entity';
import { StudentPlea } from '../students/student-plea.entity';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, StudentPlea]),
    CoursesModule
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}