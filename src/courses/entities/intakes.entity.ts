import { BaseEntity } from "src/core/entities/base.entity";
import { EMonth } from "src/core/types/months.types";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Course } from "./course.entity";
import { Application } from "src/applications/entities/application.entity";

@Entity()
export class Intake extends BaseEntity {
    @Column({ type: 'int' })
    year: number

    @Column({ type: 'enum', enum: EMonth })
    month: EMonth;

    @ManyToOne(() => Course, course => course.intakes)
    course: Course;

    // @OneToMany(() => Application, application => application.intake)
    // applications: Application[];
}