import { BaseEntity } from "src/core/entities/base.entity";
import { EIeltsType } from "src/core/types/global.types";
import { Image } from "src/images/entities/image.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class BritishCounsil extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'datetime' })
    dob: string;

    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'enum', enum: EIeltsType })
    ieltsType: EIeltsType

    @Column({ type: 'varchar' })
    phNo: string;

    @Column({ type: 'datetime' })
    ieltsBookingDate: string; 

    @OneToOne(() => Image)
    @JoinColumn({ name: 'passprotAttatchment' })
    passportAttatchment: Image; 
}
