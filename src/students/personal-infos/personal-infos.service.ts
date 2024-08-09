import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePersonalInfoDto } from './dto/create-personal-info.dto';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalInfo } from './entities/personal-info.entity';
import { Not, Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class PersonalInfosService {
  constructor(
    @InjectRepository(PersonalInfo) private personalInfoRepo: Repository<PersonalInfo>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) { }

  async create(createPersonalInfoDto: CreatePersonalInfoDto) {
    // VALIDATE PASSPORT DATE
    this.validatePassportDates(createPersonalInfoDto);

    const student = await this.studentRepo.findOneBy({ id: createPersonalInfoDto.studentId });

    const existingPersonalInfo = await this.personalInfoRepo.findOne({
      where: [
        { passportNumber: createPersonalInfoDto.passportNumber },
        { student: { id: student.id } }
      ]
    });
    if (existingPersonalInfo) throw new ConflictException('Duplicate passport number or the student has already a personal info');

    const visaRefusalCountries = JSON.stringify(createPersonalInfoDto.visaRefusalCountries);

    const personalInfo = this.personalInfoRepo.create({
      ...createPersonalInfoDto,
      visaRefusalCountries,
      student,
    });

    const savedPersonalInfo = await this.personalInfoRepo.save(personalInfo);

    return this.personalInfoMutationReturn(savedPersonalInfo, 'create');
  }

  private validatePassportDates(createPersonalInfoDto: CreatePersonalInfoDto | UpdatePersonalInfoDto, existingPersonalInfo?: PersonalInfo) {
    const today = new Date();
    const expiry = new Date(createPersonalInfoDto.passportExpiryDate || existingPersonalInfo.passportExpiryDate);
    const issue = new Date(createPersonalInfoDto.passportIssueDate || existingPersonalInfo.passportIssueDate);

    if (expiry < today) throw new BadRequestException('Passport has been expired');

    if (issue > expiry) throw new BadRequestException('Passport issue date can not be greater than expiry date');

    const gap = expiry.getTime() - issue.getTime();

    if (gap < 1000 * 60 * 60 * 24 * 365 * 10) throw new BadRequestException('Passport issue and expiry date should be atleast 10 years apart');
  }

  async findAll() {
    return this.personalInfoRepo.find();
  }

  async findOne(id: string) {
    const existingPersonalInfo = await this.personalInfoRepo.findOne({ where: { id } });

    if (!existingPersonalInfo) throw new BadRequestException('PersonalInfo not found');

    return existingPersonalInfo;
  }

  async update(id: string, updatePersonalInfoDto: UpdatePersonalInfoDto) {
    const existingPersonalInfo = await this.findOne(id);

    // VALIDATE PASSPORT DATE
    this.validatePassportDates(updatePersonalInfoDto, existingPersonalInfo);

    if (updatePersonalInfoDto.passportNumber && updatePersonalInfoDto.passportNumber !== existingPersonalInfo.passportNumber) {
      const foundPersonalInfo = await this.personalInfoRepo.findOne({
        where: {
          id: Not(existingPersonalInfo.id),
          passportNumber: updatePersonalInfoDto.passportNumber,
        }
      });
      if (foundPersonalInfo) throw new ConflictException('PersonalInfo with this passportNumber already exists');
    }

    Object.assign(existingPersonalInfo, {
      ...updatePersonalInfoDto,
      visaRefusalCountries: updatePersonalInfoDto.visaRefusalCountries
        ? JSON.stringify(updatePersonalInfoDto.visaRefusalCountries)
        : existingPersonalInfo.visaRefusalCountries,
    })

    const updatedPersonalInfo = await this.personalInfoRepo.save(existingPersonalInfo);

    return this.personalInfoMutationReturn(updatedPersonalInfo, 'update');
  }

  async remove(id: string) {
    const existingPersonalInfo = await this.findOne(id);
    return this.personalInfoMutationReturn(await this.personalInfoRepo.remove(existingPersonalInfo), 'delete');
  }

  private personalInfoMutationReturn(personalInfo: PersonalInfo, type: 'create' | 'update' | 'delete') {
    return {
      message: `PersonalInfo ${type}ed successfully`,
      personalInfo: {
        id: personalInfo.id,
      }
    }
  }
}
