import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FilesModule } from 'src/files/files.module';
import { PersonalInfosModule } from './personal-infos/personal-infos.module';
import { AcademicQualificationsModule } from './academic-qualifications/academic-qualifications.module';
import { WorkExperiencesModule } from './work-experiences/work-experiences.module';
import { DocumentsModule } from './documents/documents.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student
    ]),
    UsersModule,
    FilesModule,
    PersonalInfosModule,
    AcademicQualificationsModule,
    WorkExperiencesModule,
    DocumentsModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule { }
