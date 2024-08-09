import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentQueryDto } from './dto/student-query.dto';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action, AuthUser } from 'src/core/types/global.types';
import { CurrentUser } from 'src/core/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createStudentDto: CreateStudentDto, @CurrentUser() currentUser: AuthUser) {
    return this.studentsService.create(createStudentDto, currentUser);
  }

  @Get()
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll(@Query() queryDto: StudentQueryDto, @CurrentUser() currentUser: AuthUser) {
    return this.studentsService.findAll(queryDto, currentUser);
  }

  @Get(':id')
  @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string, @CurrentUser() currentUser: AuthUser) {
    return this.studentsService.findOne(id, currentUser);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto, @CurrentUser() currentUser: AuthUser) {
    return this.studentsService.update(id, updateStudentDto, currentUser);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string, @CurrentUser() currentUser: AuthUser) {
    return this.studentsService.remove(id, currentUser);
  }
}
