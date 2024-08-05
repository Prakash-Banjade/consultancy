import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkExperience } from './entities/work-experience.entity';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class WorkExperiencesService {
  constructor(
    @InjectRepository(WorkExperience) private workExperienceRepo: Repository<WorkExperience>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) { }

  async create(createWorkExperienceDto: CreateWorkExperienceDto) {
    // check if student exists
    const foundStudent = await this.findStudent(createWorkExperienceDto.studentId)

    // check if work experience already exists
    if (foundStudent.workExperience?.id) throw new BadRequestException('Work experience already exists');

    const newWorkExperience = this.workExperienceRepo.create({
      ...createWorkExperienceDto,
      student: foundStudent
    })

    const savedWorkExperience = await this.workExperienceRepo.save(newWorkExperience)

    return this.workExperienceMutationReturn(savedWorkExperience, 'create')
  }

  private async findStudent(studentId: string) {
    const foundStudent = await this.studentRepo.findOne({
      where: {
        id: studentId
      },
      relations: {
        workExperience: true
      }
    })
    if (!foundStudent) throw new BadRequestException('Student does not exist');

    return foundStudent
  }

  async findAll() {
    return await this.workExperienceRepo.find();
  }

  async findOne(id: string) {
    const foundWorkExperience = await this.workExperienceRepo.findOne({
      where: {
        id
      },
      relations: {
        student: true
      }
    })
    if (!foundWorkExperience) throw new BadRequestException('Work experience does not exist');
    return foundWorkExperience
  }

  async update(id: string, updateWorkExperienceDto: UpdateWorkExperienceDto) {
    const existing = await this.findOne(id);

    Object.assign(existing, updateWorkExperienceDto);

    const saved = await this.workExperienceRepo.save(existing);

    return this.workExperienceMutationReturn(saved, 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.workExperienceMutationReturn(await this.workExperienceRepo.remove(existing), 'remove');
  }

  private workExperienceMutationReturn(workExperience: WorkExperience, type: 'create' | 'update' | 'remove') {
    return {
      message: `Work experience ${type}ed successfully`,
      workExperience: {
        id: workExperience.id
      }
    }
  }
}
