import { Module } from '@nestjs/common';
import { LevelOfStudiesService } from './level-of-studies.service';
import { LevelOfStudiesController } from './level-of-studies.controller';
import { LevelOfStudy } from './entities/level-of-study.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LevelOfStudy,
      Student,
    ])
  ],
  controllers: [LevelOfStudiesController],
  providers: [LevelOfStudiesService],
})
export class LevelOfStudiesModule { }
