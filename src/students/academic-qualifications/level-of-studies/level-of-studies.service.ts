import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelOfStudyDto } from './dto/create-level-of-study.dto';
import { UpdateLevelOfStudyDto } from './dto/update-level-of-study.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelOfStudy } from './entities/level-of-study.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class LevelOfStudiesService {
  constructor(
    @InjectRepository(LevelOfStudy) private levelOfStudyRepo: Repository<LevelOfStudy>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) { }

  async create(createLevelOfStudyDto: CreateLevelOfStudyDto) {
    this.validateStartAndEndDates(createLevelOfStudyDto);

    // check if student exists
    const student = await this.studentRepo.findOne({
      where: {
        id: createLevelOfStudyDto.studentId,
        academicQualification: { id: createLevelOfStudyDto.academicQualificationId }
      },
      relations: {
        academicQualification: {
          levelOfStudies: true
        }
      },
    });
    if (!student) throw new BadRequestException('Student does not exist');

    // check if academicQualification exists
    if (student.academicQualification.id !== createLevelOfStudyDto.academicQualificationId) throw new BadRequestException('Academic qualification does not exist');

    // check if level of study already exists
    const existingLevelOfStudy = student.academicQualification.levelOfStudies.find(levelOfStudy => levelOfStudy.levelOfStudy === createLevelOfStudyDto.levelOfStudy);
    if (existingLevelOfStudy) throw new BadRequestException('Level of study already exists');

    const newLevelOfStudy = this.levelOfStudyRepo.create({
      ...createLevelOfStudyDto,
      academicQualification: student.academicQualification,
    })

    const savedLevelOfStudy = await this.levelOfStudyRepo.save(newLevelOfStudy);

    return {
      message: 'Level of study created successfully',
      levelOfStudy: {
        id: savedLevelOfStudy.id
      }
    }

  }

  private validateStartAndEndDates(createPersonalInfoDto: CreateLevelOfStudyDto | UpdateLevelOfStudyDto, existingPersonalInfo?: LevelOfStudy) {
    const today = new Date();
    const startDate = new Date(createPersonalInfoDto.startDate || existingPersonalInfo.startDate);
    const endDate = new Date(createPersonalInfoDto.endDate || existingPersonalInfo.endDate);

    if (endDate > today) throw new BadRequestException('End date can not be greater than today');

    if (endDate < startDate) throw new BadRequestException('Start date can not be greater than end date');

    const gap = startDate.getTime() - endDate.getTime();

    if (gap < 1000 * 60 * 60 * 24 * 365) throw new BadRequestException('Start and end date should be atleast 1 year apart');
  }

  async findAll() {
    return await this.levelOfStudyRepo.find();
  }

  async findOne(id: string) {
    const existing = await this.levelOfStudyRepo.findOne({
      where: { id },
    })

    if (!existing) throw new NotFoundException('Level of study does not exist');

    return existing
  }

  async update(id: string, updateLevelOfStudyDto: UpdateLevelOfStudyDto) {
    const existing = await this.findOne(id)

    this.validateStartAndEndDates(updateLevelOfStudyDto, existing);

    Object.assign(existing, updateLevelOfStudyDto);

    const saved = await this.levelOfStudyRepo.save(existing);

    return {
      messsage: 'Level of study updated successfully',
      levelOfStudy: {
        id: saved.id
      }
    }
  }

  async remove(id: string) {
    const existing = await this.findOne(id)
    const removed = await this.levelOfStudyRepo.remove(existing);

    return {
      message: 'Level of study removed successfully',
      levelOfStudy: {
        id: removed.id
      }
    }
  }
}
