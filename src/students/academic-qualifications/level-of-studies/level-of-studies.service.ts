import { Injectable } from '@nestjs/common';
import { CreateLevelOfStudyDto } from './dto/create-level-of-study.dto';
import { UpdateLevelOfStudyDto } from './dto/update-level-of-study.dto';

@Injectable()
export class LevelOfStudiesService {
  create(createLevelOfStudyDto: CreateLevelOfStudyDto) {
    return 'This action adds a new levelOfStudy';
  }

  findAll() {
    return `This action returns all levelOfStudies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} levelOfStudy`;
  }

  update(id: number, updateLevelOfStudyDto: UpdateLevelOfStudyDto) {
    return `This action updates a #${id} levelOfStudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} levelOfStudy`;
  }
}
