import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentPlea } from './student-plea.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentPlea]),
    CoursesModule,
    UsersModule
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}