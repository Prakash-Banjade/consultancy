import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { StudentQueryDto } from './dto/student-query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private readonly filesService: FilesService,
  ) { }

  async create(createStudentDto: CreateStudentDto) {

    await this.checkIfStudentExists(createStudentDto);

    // evaluate documents
    const [
      cv,
      recommendationLetter,
      experienceDoc,
      passportDoc,
      ieltsPteMarkDoc,
      certificate_grade_10,
      transcript_grade_10,
      certificate_plus_two,
      transcript_plus_two,
      certificate_bachelor,
      transcript_bachelor
    ] = await this.filesService.findAllByIds([
      createStudentDto.cvId,
      createStudentDto.recommendationLetterId,
      createStudentDto.experienceDocId,
      createStudentDto.passportDocId,
      createStudentDto.ieltsPteMarkDocId,
      createStudentDto.certificate_grade_10_id,
      createStudentDto.transcript_grade_10_id,
      createStudentDto.certificate_plus_two_id,
      createStudentDto.transcript_plus_two_id,
      createStudentDto.certificate_bachelor_id,
      createStudentDto.transcript_bachelor_id
    ])


    const newStudent = this.studentRepo.create({
      ...createStudentDto,
      cv,
      recommendationLetter,
      experienceDoc,
      passportDoc,
      ieltsPteMarkDoc,
      certificate_grade_10,
      transcript_grade_10,
      certificate_plus_two,
      transcript_plus_two,
      certificate_bachelor,
      transcript_bachelor
    })

    return this.studentMutationReturn(newStudent, 'create');
  }

  async findAll(queryDto: StudentQueryDto) {
    const querybuilder = this.studentRepo.createQueryBuilder('student')

    querybuilder
      .orderBy('student.createdAt', queryDto.order)
      .take(queryDto.take)
      .skip(queryDto.skip)
      .where(new Brackets(qb => {
        queryDto.search && qb.andWhere("LOWER(CONCAT(student.firstName, ' ', student.lastName)) LIKE LOWER(:search)", { search: `%${queryDto.search}%` })
        // queryDto.countryIds?.length && qb.andWhere('student.countryId IN (:...countryIds)', { countryIds: queryDto.countryIds })
        queryDto.createdFrom && qb.andWhere('student.createdAt >= :createdFrom', { createdFrom: queryDto.createdFrom })
        queryDto.createdTo && qb.andWhere('student.createdAt <= :createdTo', { createdTo: queryDto.createdTo })
      }))

    return paginatedData(queryDto, querybuilder)
  }

  async findOne(id: string) {
    const existingStudent = await this.studentRepo.findOne({ where: { id } });
    if (!existingStudent) throw new BadRequestException('Student not found');

    return existingStudent;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const existing = await this.findOne(id);

    await this.checkIfStudentExists(updateStudentDto, existing);

    const [
      cv,
      recommendationLetter,
      experienceDoc,
      passportDoc,
      ieltsPteMarkDoc,
      certificate_grade_10,
      transcript_grade_10,
      certificate_plus_two,
      transcript_plus_two,
      certificate_bachelor,
      transcript_bachelor
    ] = await this.filesService.findAllByIds([
      updateStudentDto.cvId,
      updateStudentDto.recommendationLetterId,
      updateStudentDto.experienceDocId,
      updateStudentDto.passportDocId,
      updateStudentDto.ieltsPteMarkDocId,
      updateStudentDto.certificate_grade_10_id,
      updateStudentDto.transcript_grade_10_id,
      updateStudentDto.certificate_plus_two_id,
      updateStudentDto.transcript_plus_two_id,
      updateStudentDto.certificate_bachelor_id,
      updateStudentDto.transcript_bachelor_id
    ])

    Object.assign(existing, {
      ...updateStudentDto,
      cv,
      recommendationLetter,
      experienceDoc,
      passportDoc,
      ieltsPteMarkDoc,
      certificate_grade_10,
      transcript_grade_10,
      certificate_plus_two,
      transcript_plus_two,
      certificate_bachelor,
      transcript_bachelor
    });


    return this.studentMutationReturn(existing, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.studentMutationReturn(await this.studentRepo.remove(existing), 'delete');
  }

  private async checkIfStudentExists(studentDto: CreateStudentDto | UpdateStudentDto, student?: Student) {
    const { passportNumber, email, phoneNumber } = studentDto;

    const existingStudent = await this.studentRepo.createQueryBuilder('student')
      .where(new Brackets(qb => {
        qb.where([
          { email },
          { passportNumber },
          { phoneNumber }
        ])
        student?.id && qb.andWhere({ id: Not(student.id) })
      })).getOne();

    if (existingStudent && !student) {
      if (existingStudent.email === email) throw new BadRequestException('Student with this email already exists');
      if (existingStudent.phoneNumber === phoneNumber) throw new BadRequestException('Student with this phoneNumber already exists');
      if (existingStudent.passportNumber === passportNumber) throw new BadRequestException('Student with this passportNumber already exists');
    } else if (existingStudent && student) {
      if (existingStudent.email === email && existingStudent.id !== student.id) throw new BadRequestException('Student with this email already exists');
      if (existingStudent.phoneNumber === phoneNumber && existingStudent.id !== student.id) throw new BadRequestException('Student with this phoneNumber already exists');
      if (existingStudent.passportNumber === passportNumber && existingStudent.id !== student.id) throw new BadRequestException('Student with this passportNumber already exists');
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
