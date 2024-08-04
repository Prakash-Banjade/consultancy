import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { StudentQueryDto } from './dto/student-query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    await this.checkIfStudentExists(createStudentDto);

    const newStudent = this.studentRepo.create(createStudentDto)

    const savedStudent = await this.studentRepo.save(newStudent);

    return this.studentMutationReturn(savedStudent, 'create');
  }

  async findAll(queryDto: StudentQueryDto) {
    const querybuilder = this.studentRepo.createQueryBuilder('student')

    querybuilder
      .orderBy('student.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        queryDto.search && qb.andWhere("LOWER(CONCAT(student.firstName, ' ', student.lastName)) LIKE LOWER(:search)", { search: `%${queryDto.search}%` })
        queryDto.createdFrom && qb.andWhere('student.createdAt >= :createdFrom', { createdFrom: queryDto.createdFrom })
        queryDto.createdTo && qb.andWhere('student.createdAt <= :createdTo', { createdTo: queryDto.createdTo })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existingStudent = await this.studentRepo.findOne({
      where: { id },
      relations: {
        personalInfo: true,
        academicQualification: {
          levelOfStudies: true
        }
      }
    });
    if (!existingStudent) throw new BadRequestException('Student not found');

    return existingStudent;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const existing = await this.findOne(id);

    await this.checkIfStudentExists(updateStudentDto, existing);

    Object.assign(existing, {
      ...updateStudentDto,
    });


    return this.studentMutationReturn(existing, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.studentMutationReturn(await this.studentRepo.remove(existing), 'delete');
  }

  private async checkIfStudentExists(studentDto: CreateStudentDto | UpdateStudentDto, student?: Student) {
    const { email, phoneNumber } = studentDto;

    const existingStudent = await this.studentRepo.createQueryBuilder('student')
      .where(new Brackets(qb => {
        qb.where([
          { email },
          { phoneNumber }
        ])
        student?.id && qb.andWhere({ id: Not(student.id) })
      })).getOne();

    if (existingStudent && !student) {
      if (existingStudent.email === email) throw new BadRequestException('Student with this email already exists');
      if (existingStudent.phoneNumber === phoneNumber) throw new BadRequestException('Student with this phoneNumber already exists');
    } else if (existingStudent && student) {
      if (existingStudent.email === email && existingStudent.id !== student.id) throw new BadRequestException('Student with this email already exists');
      if (existingStudent.phoneNumber === phoneNumber && existingStudent.id !== student.id) throw new BadRequestException('Student with this phoneNumber already exists');
    }
  }

  private studentMutationReturn(student: Student, type: 'create' | 'update' | 'delete') {
    return {
      message: `Student ${type}ed successfully`,
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName
      }
    }
  }
}
