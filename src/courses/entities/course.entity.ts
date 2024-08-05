import { Category } from "src/categories/entities/category.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { University } from "src/universities/entities/university.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Intake } from "./intakes.entity";
import { Application } from "src/applications/entities/application.entity";

@Entity()
export class Course extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'longtext' })
    description: string;

    @ManyToOne(() => Category, category => category.courses, { onDelete: 'SET NULL' })
    category: Category;

    @ManyToOne(() => University, university => university.courses)
    university: University;

    @Column({ type: 'float' })
    fee: number;

    @Column({ type: 'float', default: 0 })
    applicationFee: number;

    @Column({ type: 'varchar' })
    priceUnit: string;

    @Column({ type: 'simple-array' })
    comissions: string[]
    // eg: [1 to 5 Students: 12%, 6 to 15 Students:15.5 %, Above 15 Students: 19%]

    @Column({ type: 'simple-array' })
    subjectRequirements: string[]

    @Column({ type: 'text' })
    ieltsScore: string;

    @Column({ type: 'text' })
    pteScore: string;

    @Column({ type: 'float' })
    gapAccepted: number; // years

    @Column({ type: 'text' })
    courseUrl: string;

    @Column({ type: 'simple-array' })
    paymentTerms: string[]

    @Column({ type: 'varchar' })
    duration: string;

    @OneToMany(() => Intake, intake => intake.course)
    intakes: Intake[];

    @OneToMany(() => Application, application => application.course)
    applications: Application[]
}
