import { BaseEntity } from "src/core/entities/base.entity";
import { EApplicationPriority, EApplicationStatus } from "src/core/types/global.types";
import { EMonth } from "src/core/types/months.types";
import { Course } from "src/courses/entities/course.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Application extends BaseEntity {
    @Column({ type: 'int' })
    year: number

    @Column({ type: 'enum', enum: EMonth })
    month: EMonth;

    @Column({ type: 'enum', enum: EApplicationPriority, default: EApplicationPriority.NONE })
    priority: EApplicationPriority;

    @Column({ type: 'enum', enum: EApplicationStatus, default: EApplicationStatus.PENDING })
    status: EApplicationStatus;

    @ManyToOne(() => Course, course => course.applications)
    course: Course;

    @ManyToOne(() => Student, student => student.applications)
    student: Student;

}
