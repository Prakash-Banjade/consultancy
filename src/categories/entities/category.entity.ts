import { BaseEntity } from "src/core/entities/base.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Course, course => course.category)
    courses: Course[]
}
