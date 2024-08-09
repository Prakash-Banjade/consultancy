import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
import { Action } from 'src/core/types/global.types';
import { CourseQueryDto } from './dto/course-query.dto';

@ApiBearerAuth()
@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  @ChekcAbilities({ subject: 'all', action: Action.CREATE })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  // @ChekcAbilities({ subject: 'all', action: Action.READ })
  findAll(@Query() queryDto: CourseQueryDto) {
    return this.coursesService.findAll(queryDto);
  }

  @Get(':id')
  // @ChekcAbilities({ subject: 'all', action: Action.READ })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @ChekcAbilities({ subject: 'all', action: Action.UPDATE })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ChekcAbilities({ subject: 'all', action: Action.DELETE })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
