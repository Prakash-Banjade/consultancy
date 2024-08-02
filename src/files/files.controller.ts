import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { AuthUser } from 'src/core/types/global.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { QueryDto } from 'src/core/dto/query.dto';
import { Response } from 'express';
import { Public } from 'src/core/decorators/setPublicRoute.decorator';
import { CreateFileDto } from './dto/create-files.dto';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-files.dto';

@ApiBearerAuth()
@ApiTags('Upload Files')
@Controller('files') // route-path: /upload/files
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @FormDataRequest()
  upload(@Body() createFileDto: CreateFileDto, @CurrentUser() currentUser: AuthUser) {
    return this.filesService.upload(createFileDto, currentUser);
  }

  @Get()
  findAll(@Query() queryDto: QueryDto, @CurrentUser() currentUser: AuthUser) {
    return this.filesService.findAll(queryDto, currentUser);
  }

  @Public()
  @Get('get-file/:slug')
  getFile(@Param("slug") slug: string, @Res() res: Response, @CurrentUser() currentUser?: AuthUser) {
    return this.filesService.serveFile(slug, res);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Res() res: Response) {
  //   return this.filesService.findOne(id);
  // }

  @Patch(':id')
  @FormDataRequest()
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto, @CurrentUser() currentUser: AuthUser) {
    return this.filesService.update(id, updateFileDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() currentUser: AuthUser) {
    return this.filesService.remove(id, currentUser);
  }
}
