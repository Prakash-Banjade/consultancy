import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Image } from "src/images/entities/image.entity";
import { Account } from "src/accounts/entities/account.entity";
import { EGender } from "src/core/types/global.types";
import { Student } from "src/students/entities/student.entity";
import { Counselor } from "src/counselors/entities/counselor.entity";
import { Application } from "src/applications/entities/application.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'enum', enum: EGender, nullable: true })
    gender?: EGender

    @Column({ type: 'datetime', nullable: true })
    dob?: string;

    @OneToOne(() => Image, { nullable: true })
    @JoinColumn()
    profileImage?: Image;

    @OneToOne(() => Account, account => account.user, { nullable: true })
    account: Account

    @OneToOne(() => Counselor, counselor => counselor.user, { nullable: true })
    counselor: Counselor

    @OneToMany(() => Student, student => student.createdBy)
    createdStudents: Student[]

    @OneToMany(() => Application, application => application.createdBy)
    createdApplications: Application[]
}
