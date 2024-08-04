import { Module } from '@nestjs/common';
import { AcademicQualificationsService } from './academic-qualifications.service';
import { AcademicQualificationsController } from './academic-qualifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicQualification } from './entities/academic-qualification.entity';
import { LevelOfStudiesModule } from './level-of-studies/level-of-studies.module';
import { Student } from '../entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AcademicQualification,
      Student,
    ]),
    LevelOfStudiesModule,
  ],
  controllers: [AcademicQualificationsController],
  providers: [AcademicQualificationsService],
})
export class AcademicQualificationsModule {}
