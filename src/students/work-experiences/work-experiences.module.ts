import { Module } from '@nestjs/common';
import { WorkExperiencesService } from './work-experiences.service';
import { WorkExperiencesController } from './work-experiences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { WorkExperience } from './entities/work-experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkExperience,
      Student
    ]),
  ],
  controllers: [WorkExperiencesController],
  providers: [WorkExperiencesService],
})
export class WorkExperiencesModule { }
