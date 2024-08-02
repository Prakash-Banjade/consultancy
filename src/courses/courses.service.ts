import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Brackets, Repository } from 'typeorm';
import { UniversitiesService } from 'src/universities/universities.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CourseQueryDto } from './dto/course-query.dto';
import paginatedData from 'src/core/utils/paginatedData';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
    private readonly categoriesService: CategoriesService,
    private readonly universitiesService: UniversitiesService,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const existingWitSameName = await this.courseRepo.findOneBy({ name: createCourseDto.name });
    if (existingWitSameName) throw new ConflictException('Course with this name already exists');

    const university = await this.universitiesService.findOne(createCourseDto.universityId);
    const category = await this.categoriesService.findOne(createCourseDto.categoryId);

    const course = this.courseRepo.create({
      ...createCourseDto,
      university,
      category
    });

    return this.courseMutationReturn(await this.courseRepo.save(course), 'create');
  }

  async findAll(queryDto: CourseQueryDto) {
    const queryBuilder = this.courseRepo.createQueryBuilder('course')
      .orderBy('course.createdAt', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take)
      .where(new Brackets(qb => {
        queryDto.search && qb.where('LOWER(course.name) ILIKE LOWER(:search)', { search: `%${queryDto.search}%` })
      }))

    return paginatedData(queryDto, queryBuilder)
  }

  async findOne(id: string) {
    const existing = await this.courseRepo.findOne({
      where: { id },
      relations: {
        university: true,
        category: true
      }
    })
    if (!existing) throw new NotFoundException('Course not found')

    return existing;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const existing = await this.findOne(id);

    const university = updateCourseDto?.universityId
      ? await this.universitiesService.findOne(updateCourseDto.universityId)
      : existing.university;

    const category = updateCourseDto?.categoryId
      ? await this.categoriesService.findOne(updateCourseDto.categoryId)
      : existing.category;

    const updated = this.courseRepo.merge(existing, {
      ...updateCourseDto,
      university,
      category
    });

    return this.courseMutationReturn(await this.courseRepo.save(updated), 'update');
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    const removed = await this.courseRepo.remove(existing);

    return this.courseMutationReturn(removed, 'remove');
  }

  private courseMutationReturn(course: Course, type: 'create' | 'update' | 'remove') {
    return {
      message: `${type === 'create' ? 'Created' : type === 'update' ? 'Updated' : 'Removed'} course successfully`,
      course: {
        id: course.id,
        name: course.name,
      }
    }
  }
}
