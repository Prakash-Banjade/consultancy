import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { PersonalInfo } from "../personal-infos/entities/personal-info.entity";

@Entity()
export class Student extends BaseEntity {
    /**
    |--------------------------------------------------
    | PRIMARY DETAILS
    |--------------------------------------------------
    */

    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
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
    @OneToOne(() => PersonalInfo, { nullable: true })
    @JoinColumn()
    personalInfo: PersonalInfo;

    // ACADEMIC QUALIFICATION

    // WORK EXPERIENCE

    // TESTS
}
