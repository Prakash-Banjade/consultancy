import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UniversitiesModule } from 'src/universities/universities.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Intake } from './entities/intakes.entity';
import { IntakesController } from './intakes.controller';
import { IntakesService } from './intakes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Intake,
    ]),
    CategoriesModule,
    UniversitiesModule,
  ],
  controllers: [CoursesController, IntakesController],
  providers: [CoursesService, IntakesService],
  exports: [CoursesService],
})
export class CoursesModule { }
