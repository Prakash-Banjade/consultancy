import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "src/core/entities/base.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Counselor extends BaseEntity {
    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar', nullable: true })
    middleName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    phoneNumber: string;

    @OneToOne(() => User, (user) => user.counselor)
    @JoinColumn()
    user: User;

    @Column('boolean', { default: false })
    eligibleForComission: boolean = false;
}
