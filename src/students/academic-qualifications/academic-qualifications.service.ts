import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAcademicQualificationDto } from './dto/create-academic-qualification.dto';
import { UpdateAcademicQualificationDto } from './dto/update-academic-qualification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademicQualification } from './entities/academic-qualification.entity';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class AcademicQualificationsService {
  constructor(
    @InjectRepository(AcademicQualification) private readonly academicQualificationRepo: Repository<AcademicQualification>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) { }

  async create(createAcademicQualificationDto: CreateAcademicQualificationDto) {
    const student = await this.studentRepo.findOne({
      where: { id: createAcademicQualificationDto.studentId },
      relations: { academicQualification: true }
    });
    if (student.academicQualification) throw new ConflictException('Student already has an academic qualification');

    const newAcademicQualification = this.academicQualificationRepo.create({
      ...createAcademicQualificationDto,
      student
    });

    const savedAcademicQualification = await this.academicQualificationRepo.save(newAcademicQualification);

    return this.academicQualificationMutationReturn(savedAcademicQualification, 'create');
  }

  async findAll() {
    return this.academicQualificationRepo.find();
  }

  async findOne(id: string) {
    const existingAcademicQualification = await this.academicQualificationRepo.findOne({
      where: { id },
      relations: ['student']
    });
    if (!existingAcademicQualification) throw new NotFoundException('Academic aualification not found')

    return existingAcademicQualification;
  }

  async update(id: string, updateAcademicQualificationDto: UpdateAcademicQualificationDto) {
    const existing = await this.findOne(id);

    if (existing.student.id !== updateAcademicQualificationDto.studentId) throw new BadRequestException('This record does not belong to given student')

    Object.assign(existing, {
      ...updateAcademicQualificationDto,
    })

    const savedAcademicQualification = await this.academicQualificationRepo.save(existing);

    return this.academicQualificationMutationReturn(savedAcademicQualification, 'update')
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    return this.academicQualificationMutationReturn(await this.academicQualificationRepo.remove(existing), 'delete');
  }

  private academicQualificationMutationReturn(academicQualification: AcademicQualification, type: 'create' | 'update' | 'delete') {
    return {
      message: type === 'create' ?
        `Academic qualification created successfully`
        : type === 'update'
          ? `Academic qualification updated successfully`
          : `Academic qualification deleted successfully`,
      academicQualification: {
        id: academicQualification.id,
        highestLevelOfEducation: academicQualification.highestLevelOfEducation,
        countryOfEducation: academicQualification.countryOfEducation,
      }
    }
  }
}
