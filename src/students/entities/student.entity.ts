import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PersonalInfo } from "../personal-infos/entities/personal-info.entity";
import { AcademicQualification } from "../academic-qualifications/entities/academic-qualification.entity";
import { WorkExperience } from "../work-experiences/entities/work-experience.entity";
import { Application } from "src/applications/entities/application.entity";
import { Document } from "../documents/entities/document.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Student extends BaseEntity {
    /**
    |--------------------------------------------------
    | PRIMARY DETAILS
    |--------------------------------------------------
    */

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar', nullable: true })
    middleName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phoneNumber: string;

    @Column({ type: 'datetime' })
    dob: string;

    // PERSONAL INFO
    @OneToOne(() => PersonalInfo, (personalInfo) => personalInfo.student, { nullable: true })
    @JoinColumn()
    personalInfo: PersonalInfo;

    // ACADEMIC QUALIFICATION
    @OneToOne(() => AcademicQualification, (academicQualification) => academicQualification.student, { nullable: true })
    @JoinColumn()
    academicQualification: AcademicQualification;

    // WORK EXPERIENCE
    @OneToOne(() => WorkExperience, (workExperience) => workExperience.student, { nullable: true })
    @JoinColumn()
    workExperience: WorkExperience;

    // TESTS


    // DOCUMENTS
    @OneToOne(() => Document, document => document.student, { nullable: true })
    @JoinColumn()
    document: Document;

    @OneToMany(() => Application, application => application.student)
    applications: Application[]

    @ManyToOne(() => User, user => user.createdStudents, { onDelete: 'SET NULL' })
    createdBy: User
}
