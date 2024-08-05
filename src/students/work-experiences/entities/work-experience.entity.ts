import { BadRequestException } from "@nestjs/common";
import { BaseEntity } from "src/core/entities/base.entity";
import { EModeOfSalary } from "src/core/types/global.types";
import { Student } from "src/students/entities/student.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from "typeorm";

@Entity()
export class WorkExperience extends BaseEntity {
    @Column({ type: 'varchar' })
    nameOfOrganization: string;

    @Column({ type: 'varchar' })
    position: string;

    @Column({ type: 'varchar' })
    jobProfile: string;

    @Column({ type: 'datetime' })
    workingFrom: string;

    @Column({ type: 'datetime', nullable: true })
    workingUpto: string;

    @Column({ type: 'enum', enum: EModeOfSalary })
    modeOfSalary: EModeOfSalary;

    @Column({ type: 'boolean' })
    currentlyWorking: boolean;

    @OneToOne(() => Student, student => student.workExperience)
    student: Student

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        if (!this.currentlyWorking && !this.workingUpto) throw new BadRequestException('Please provide working upto date for currently working student');
        if (this.currentlyWorking) this.workingUpto = null;
    }
}