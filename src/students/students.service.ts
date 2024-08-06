import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { StudentQueryDto } from './dto/student-query.dto';
import paginatedData from 'src/core/utils/paginatedData';
import { studentSelectCols } from './entities/student-select-cols.config';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/core/types/global.types';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private readonly usersService: UsersService,
  ) { }

  async create(createStudentDto: CreateStudentDto, currentUser: AuthUser) {
    await this.checkIfStudentExists(createStudentDto);

    const user = await this.usersService.findOne(currentUser.userId);

    const newStudent = this.studentRepo.create({
      ...createStudentDto,
      createdBy: user,
    });

    const savedStudent = await this.studentRepo.save(newStudent);

    return this.studentMutationReturn(savedStudent, 'create');
  }

  async findAll(queryDto: StudentQueryDto) {
    const querybuilder = this.studentRepo.createQueryBuilder('student')

    querybuilder
      .orderBy('student.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .loadRelationCountAndMap('student.applicationsCount', 'student.applications')
      .leftJoin('student.applications', 'application')
      .leftJoin('application.course', 'course')
      .leftJoin('course.intakes', 'intakes')
      .leftJoin('course.university', 'university')
      .leftJoin('university.country', 'country')
      .where(new Brackets(qb => {
        queryDto.search && qb.andWhere("LOWER(CONCAT(student.firstName, ' ', student.lastName)) LIKE LOWER(:search)", { search: `%${queryDto.search}%` })
        queryDto.createdFrom && qb.andWhere('student.createdAt >= :createdFrom', { createdFrom: queryDto.createdFrom })
        queryDto.createdTo && qb.andWhere('student.createdAt <= :createdTo', { createdTo: queryDto.createdTo })
        queryDto.countryIds && qb.andWhere('country.id IN (:...countryIds)', { countryIds: queryDto.countryIds })
        queryDto.intakeMonths && qb.andWhere('intakes.month IN (:...months)', { months: queryDto.intakeMonths })
        queryDto.intakeYears && qb.andWhere('intakes.year IN (:...years)', { years: queryDto.intakeYears })
        queryDto.statuses && qb.andWhere('application.status IN (:...statuses)', { statuses: queryDto.statuses })
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
        },
        workExperience: true,
        document: {
          bankBalanceCertificate: true,
          financialAffidavit: true,
          consent_form: true,
          ielts: true,
          grade_eleven_marksheet: true,
          english_learning_certificate: true,
          grade_nine_marksheet: true,
          grade_ten_marksheet: true,
          grade_twelve_marksheet: true,
          passport: true,
        }
      },
      select: studentSelectCols
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
