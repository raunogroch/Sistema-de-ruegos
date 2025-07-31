import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentPlea, PleaStatus } from './student-plea.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { CreatePleaDto } from './dto/create-plea.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentPlea)
    private readonly pleaRepository: Repository<StudentPlea>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPlea(createPleaDto: CreatePleaDto, studentId: number): Promise<StudentPlea> {
    const student = await this.userRepository.findOne({ where: { id: studentId } });
    const course = await this.courseRepository.findOne({ where: { id: createPleaDto.courseId } });

    if (!student || !course) {
      throw new Error('Student or Course not found');
    }

    const plea = new StudentPlea();
    plea.reason = createPleaDto.reason;
    plea.justification = createPleaDto.justification;
    plea.offer = createPleaDto.offer;
    plea.student = student;
    plea.course = course;
    plea.status = PleaStatus.PENDING;

    return this.pleaRepository.save(plea);
  }

  async getStudentPleas(studentId: number): Promise<StudentPlea[]> {
    return this.pleaRepository.find({
      where: { student: { id: studentId } },
      relations: ['course', 'course.teacher'],
    });
  }
}