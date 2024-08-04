import { BaseEntity } from "src/core/entities/base.entity";
import { EMonth } from "src/core/types/months.types";
import { Column, Entity, ManyToOne } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class Intake extends BaseEntity {
    @Column({ type: 'int' })
    year: number

    @Column({ type: 'enum', enum: EMonth })
    from: EMonth;

    @Column({ type: 'enum', enum: EMonth })
    to: EMonth;

    @ManyToOne(() => Course, course => course.intakes)
    course: Course;
}