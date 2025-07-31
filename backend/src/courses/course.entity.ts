import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { StudentPlea } from '../students/student-plea.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.courses)
  teacher: User;

  @OneToMany(() => StudentPlea, (plea) => plea.course)
  pleas: StudentPlea[];
}