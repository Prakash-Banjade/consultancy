import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FilesModule } from 'src/files/files.module';
import { PersonalInfosModule } from './personal-infos/personal-infos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student
    ]),
    FilesModule,
    PersonalInfosModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }
