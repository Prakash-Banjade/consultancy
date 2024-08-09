import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Brackets, Repository } from 'typeorm';
import { ApplicationQueryDto } from './dto/application-query.dto';
import paginatedData from 'src/core/utils/paginatedData';
import { StudentsService } from 'src/students/students.service';
import { AuthUser } from 'src/core/types/global.types';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private readonly applicationRepo: Repository<Application>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    private readonly studentsService: StudentsService,
  ) { }

  async create(createApplicationDto: CreateApplicationDto, currentUser: AuthUser) {
    const student = await this.studentsService.findOne(createApplicationDto.studentId, currentUser)

    const course = await this.courseRepo.findOne({
      where: {
        id: createApplicationDto.courseId,
        intakes: {
          year: createApplicationDto.year,
          month: createApplicationDto.month,
        }
      }
    })
    if (!course) throw new NotFoundException('Course not found or course is not available for the given intake.')

    const application = this.applicationRepo.create({
      ...createApplicationDto,
      student,
      course
    })

    const saved = await this.applicationRepo.save(application)

    return this.applicationMutationReturn(saved, 'create');
  }

  async findAll(queryDto: ApplicationQueryDto, currentUser: AuthUser) {
    const queryBuilder = this.applicationRepo.createQueryBuilder('application')
      .orderBy('application.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .leftJoin('application.course', 'course')
      .leftJoin('application.student', 'student')
      .leftJoin('course.intakes', 'intakes')
      .leftJoin('course.university', 'university')
      .leftJoin('university.country', 'country')
      .where(new Brackets(qb => {
        queryDto.createdAt && qb.andWhere('application.createdAt >= :createdAt', { createdAt: queryDto.createdAt })
        queryDto.ackNo && qb.andWhere('application.ackNo = :ackNo', { ackNo: queryDto.ackNo })
        queryDto.countryIds && qb.andWhere('country.id IN (:...countryIds)', { countryIds: queryDto.countryIds })
        queryDto.intakeMonths && qb.andWhere('intakes.month IN (:...months)', { months: queryDto.intakeMonths })
        queryDto.intakeYears && qb.andWhere('intakes.year IN (:...years)', { years: queryDto.intakeYears })
        queryDto.statuses && qb.andWhere('application.status IN (:...statuses)', { statuses: queryDto.statuses })
        queryDto.universityId && qb.andWhere('university.id = :universityId', { universityId: queryDto.universityId })
        queryDto.courseName && qb.andWhere('LOWER(course.name) ILIKE LOWER(:courseName)', { courseName: `%${queryDto.courseName}%` })
        queryDto.search && qb.andWhere("LOWER(CONCAT(student.firstName, ' ', student.middleName, ' ', student.lastName)) LIKE LOWER(:search)", { search: `%${queryDto.studentName}%` })
      }))

    return paginatedData(queryDto, queryBuilder)
  }

  async findOne(id: string, currentUser: AuthUser) {
    const existing = await this.applicationRepo.findOne({
      where: {
        id,
        createdBy: {
          account: {
            company: {
              id: currentUser.companyId
            }
          }
        }
      },
      relations: {
        student: true,
        course: {
          university: true
        }
      }
    })
    if (!existing) throw new NotFoundException('Application not found')

    return existing;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto, currentUser: AuthUser) {
    const existing = await this.findOne(id, currentUser);

    Object.assign(existing, updateApplicationDto);

    const saved = await this.applicationRepo.save(existing);

    return this.applicationMutationReturn(saved, 'update');
  }

  async remove(id: string, currentUser: AuthUser) {
    const existing = await this.findOne(id, currentUser);

    const removed = await this.applicationRepo.remove(existing);

    return this.applicationMutationReturn(removed, 'remove');
  }

  private applicationMutationReturn(application: Application, type: 'create' | 'update' | 'remove') {
    return {
      message: type === 'create' ? 'Created successfully' : type === 'update' ? 'Updated successfully' : 'Removed successfully',
      application: {
        id: application.id,
        year: application.year,
        month: application.month,
        priority: application.priority,
        status: application.status,
      }
    }
  }
}
