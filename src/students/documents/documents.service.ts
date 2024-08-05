import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { FilesService } from 'src/files/files.service';
import { Student } from '../entities/student.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private readonly documentRepo: Repository<Document>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    private readonly filesService: FilesService,
  ) { }

  async create(createDocumentDto: CreateDocumentDto) {
    const student = await this.studentRepo.findOne({
      where: { id: createDocumentDto.studentId },
      relations: { document: true },
    })

    if (student.document) throw new ConflictException('Student already has document record')

    const result = await Promise.all([
      this.filesService.findOne(createDocumentDto.grade_ten_marksheetId),
      this.filesService.findOne(createDocumentDto.grade_twelve_marksheetId),
      this.filesService.findOne(createDocumentDto.passportId),
      this.filesService.findOne(createDocumentDto.english_learning_certificateId),
      this.filesService.findOne(createDocumentDto.grade_nine_marksheetId),
      this.filesService.findOne(createDocumentDto.grade_eleven_marksheetId),
      this.filesService.findOne(createDocumentDto.consent_formId),
      this.filesService.findOne(createDocumentDto.ieltsId),
      this.filesService.findOne(createDocumentDto.bankBalanceCertificateId),
      this.filesService.findOne(createDocumentDto.financialAffidavitId),
    ])

    const document = this.documentRepo.create({
      student: student,
      grade_ten_marksheet: result[0],
      grade_twelve_marksheet: result[1],
      passport: result[2],
      english_learning_certificate: result[3],
      grade_nine_marksheet: result[4],
      grade_eleven_marksheet: result[5],
      consent_form: result[6],
      ielts: result[7],
      bankBalanceCertificate: result[8],
      financialAffidavit: result[9],
    });

    return this.documentRepo.save(document);
  }

  async findAll() {
    return this.documentRepo.find();
  }

  async findOne(id: string) {
    const existing = await this.documentRepo.findOne({
      where: { id },
    });

    if (!existing) throw new NotFoundException('Document does not exist');

    return existing;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const existing = await this.findOne(id);

    for (const keyId in updateDocumentDto) {
      const key = keyId.replace('Id', '');
      console.log(key)
    }

    return null;
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    const removed = await this.documentRepo.remove(existing);

    return removed;
  }
}
