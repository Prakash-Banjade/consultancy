import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateFileDto } from './dto/create-files.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Brackets, In, Like, Repository } from 'typeorm';
import { AuthUser, Roles } from 'src/core/types/global.types';
import { AccountsService } from 'src/accounts/accounts.service';
import { QueryDto } from 'src/core/dto/query.dto';
import paginatedData from 'src/core/utils/paginatedData';
import path from 'path';
import fs from 'fs';
import { Response } from 'express';
import axios from 'axios';
import sharp from 'sharp';
import { applySelectColumns } from 'src/core/utils/apply-select-cols';
import { getFileMetadata } from 'src/core/utils/getFileMetadata';
import { fileSelectColumns } from './entities/file-select-cols.config';
import { UpdateFileDto } from './dto/update-files.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private filesRepository: Repository<File>,
    private readonly accountService: AccountsService
  ) { }

  async upload(createFileDto: CreateFileDto, currentUser: AuthUser) {
    const account = await this.accountService.findOne(currentUser.accountId);

    for (const uploadFile of createFileDto.files) {
      const metaData = await getFileMetadata(uploadFile);

      const newFile = this.filesRepository.create({
        ...metaData,
        name: createFileDto.name || metaData.originalName,
        uploadedBy: account
      })

      await this.filesRepository.save(newFile);
    }

    return {
      message: 'File(s) Uploaded',
      count: createFileDto.files.length,
    }
  }

  async findAll(queryDto: QueryDto, currentUser: AuthUser) {
    const queryBuilder = this.filesRepository.createQueryBuilder('file');

    queryBuilder
      .orderBy('file.createdAt', 'DESC')
      .skip(queryDto.skip)
      .take(queryDto.take)
      .leftJoin('file.uploadedBy', 'uploadedBy')
      .where(new Brackets(qb => {
        currentUser.role !== Roles.ADMIN && qb.where({ uploadedBy: { id: currentUser.accountId } })
      }))

    applySelectColumns(queryBuilder, fileSelectColumns, 'file');

    return paginatedData(queryDto, queryBuilder);
  }

  async findAllByIds(ids: string[]) {
    return await this.filesRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  async findOne(id: string, currentUser?: AuthUser) {
    const existingFile = await this.filesRepository.findOne({
      where: {
        id,
        uploadedBy: {
          id: currentUser?.accountId
        }
      },
    });
    if (!existingFile) throw new NotFoundException('File with id ' + id + ' not found');

    return existingFile
  }

  async serveFile(filename: string, @Res() res: Response) {
    console.log(filename)

    const filePath = path.join(process.cwd(), 'public', filename);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          throw new NotFoundException('File not found');
        } else {
          throw new Error(err.message);
        }
      }

      const contentTypeFormat = path.extname(filename).substring(1) === 'pdf' ? 'application/pdf' : 'image/' + path.extname(filename).substring(1);

      // Set appropriate headers
      res.setHeader('Content-Type', contentTypeFormat);
      res.setHeader('Content-Length', stats.size);

      // Stream the file to the response
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    });
  }

  async saveFileFromUrl(url: string) {
    // Fetch the file from the URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(response.data);

    // Analyze the file with sharp
    const metadata = await sharp(fileBuffer).metadata();

    const file = this.filesRepository.create({
      url,
      memeType: metadata.format,
      format: metadata.format,
      size: metadata.size,
      originalName: url.split('/').pop() || 'unknown', // Extract the file name from URL
    });

    return await this.filesRepository.save(file);
  }

  async update(id: string, updateFileDto: UpdateFileDto, currentUser: AuthUser) {
    const existing = await this.findOne(id, currentUser?.role !== 'admin' ? currentUser : undefined);

    // update file name only
    existing.name = updateFileDto.name;

    const savedFile = await this.filesRepository.save(existing);

    return {
      message: 'File updated',
      file: {
        url: savedFile.url,
        id: savedFile.id
      }
    }
  }

  async remove(id: string, currentUser: AuthUser) {
    const existing = await this.findOne(id, currentUser);
    await this.filesRepository.remove(existing);
    return {
      message: 'File deleted successfully'
    }
  }
}
