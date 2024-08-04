import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { EGradingSystem, ELevelOfEducation } from "src/core/types/global.types";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm";
import { AcademicQualification } from "../../entities/academic-qualification.entity";

@Entity()
export class LevelOfStudy extends BaseEntity {
    @Column({ type: 'enum', enum: ELevelOfEducation })
    levelOfStudy: ELevelOfEducation;

    @Column({ type: 'varchar', nullable: true })
    nameOfBoard: string;

    @BeforeInsert()
    @BeforeUpdate()
    setNameOfBoard() {
        if (this.levelOfStudy === ELevelOfEducation.POSTGRADUATE || this.levelOfStudy === ELevelOfEducation.UNDERGRADUATE) {
            this.nameOfBoard = null;
        }
    }

    @Column({ type: 'varchar' })
    nameOfInstitution: string;

    @Column({ type: 'enum', enum: ECountry })
    countryOfStudy: ECountry

    @Column({ type: 'varchar' })
    stateOfStudy: string;

    @Column({ type: 'varchar' })
    cityOfStudy: string

    @Column({ type: 'varchar' })
    degreeAwarded: string;

    @Column({ type: 'enum', enum: EGradingSystem })
    gradingSystem: EGradingSystem;

    @Column({ type: 'float' })
    percentage: number;

    @Column({ type: 'varchar' })
    primaryLanguage: string;

    @Column({ type: 'datetime' })
    startDate: string;

    @Column({ type: 'datetime' })
    endDate: string;

    @ManyToOne(() => AcademicQualification, academicQualification => academicQualification.levelOfStudies)
    academicQualification: AcademicQualification;
}
