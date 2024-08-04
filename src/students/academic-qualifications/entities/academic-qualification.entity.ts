import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { ELevelOfEducation } from "src/core/types/global.types";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { LevelOfStudy } from "../level-of-studies/entities/level-of-study.entity";
import { Student } from "src/students/entities/student.entity";

@Entity()
export class AcademicQualification extends BaseEntity {
    @Column({ type: 'enum', enum: ECountry })
    countryOfEducation: ECountry;

    @Column({ type: 'enum', enum: ELevelOfEducation })
    highestLevelOfEducation: ELevelOfEducation;

    @OneToMany(() => LevelOfStudy, levelOfStudy => levelOfStudy.academicQualification)
    levelOfStudies: LevelOfStudy[];

    @OneToOne(() => Student, (student) => student.academicQualification)
    student: Student
}
