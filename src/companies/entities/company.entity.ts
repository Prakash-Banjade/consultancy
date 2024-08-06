import { Address } from "src/addresses/entities/address.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CompanyBankingDetail } from "./company-banking-detail.entity";

@Entity()
export class Company extends BaseEntity {
    @Column('varchar')
    name: string;

    @Column('varchar')
    contactNumber: string;

    @Column('varchar')
    email: string;

    @OneToOne(() => Address)
    @JoinColumn({ name: 'addressId' })
    address: Address;

    @OneToOne(() => CompanyBankingDetail, (bankingDetail) => bankingDetail.company, { nullable: true })
    @JoinColumn({ name: 'bankingDetail' })
    bankingDetail: CompanyBankingDetail
}
