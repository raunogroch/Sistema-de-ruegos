import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

export enum PleaStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class StudentPlea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  justification: string;

  @Column()
  offer: string;

  @Column({
    type: 'enum',
    enum: PleaStatus,
    default: PleaStatus.PENDING,
  })
  status: PleaStatus;

  @ManyToOne(() => User, (user) => user.pleas)
  student: User;

  @ManyToOne(() => Course, (course) => course.pleas)
  course: Course;
}