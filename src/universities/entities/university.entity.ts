import { BaseEntity } from "src/core/entities/base.entity";
import { Country } from "src/countries/entities/country.entity";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class University extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    comission: string;

    @ManyToOne(() => Country, country => country.universities, { onDelete: 'SET NULL' })
    country: Country

    @Column({ type: 'varchar' })
    state: string;

    @Column({ type: 'longtext' })
    description: string;

    @OneToMany(() => Course, course => course.university)
    courses: Course[]
}
