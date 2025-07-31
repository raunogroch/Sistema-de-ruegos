import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/course.entity';
import { StudentPlea, PleaStatus } from '../students/student-plea.entity';
import { User } from '../users/user.entity';
import { UpdatePleaStatusDto } from './dto/update-plea-status.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(StudentPlea)
    private readonly pleaRepository: Repository<StudentPlea>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTeacherCourses(teacherId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }

  async getCoursePleas(courseId: number): Promise<StudentPlea[]> {
    return this.pleaRepository.find({
      where: { course: { id: courseId } },
      relations: ['student', 'course'],
    });
  }

  async updatePleaStatus(pleaId: number, status: PleaStatus): Promise<StudentPlea> {
    const plea = await this.pleaRepository.findOne({ where: { id: pleaId } });
    if (!plea) {
      throw new Error('Plea not found');
    }

    plea.status = status;
    return this.pleaRepository.save(plea);
  }
}