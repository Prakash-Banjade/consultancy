import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Address extends BaseEntity {
    @Column({ type: 'varchar' })
    address1!: string;

    @Column({ type: 'varchar', nullable: true })
    address2?: string;

    @Column({ type: 'varchar' })
    city!: string;

    @Column({ type: 'enum', enum: ECountry })
    country!: ECountry;

    @Column({ type: 'varchar' })
    state!: string;

    @Column({ type: 'int' })
    zipCode!: number;
}
