import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { FilesModule } from 'src/files/files.module';
import { StudentsModule } from '../students.module';
import { Student } from '../entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Document,
      Student,
    ]),
    FilesModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule { }
