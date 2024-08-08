import { Address } from "src/addresses/entities/address.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CompanyBankingDetail } from "./company-banking-detail.entity";
import { Account } from "src/accounts/entities/account.entity";
import { Image } from "src/images/entities/image.entity";

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

    @OneToOne(() => Image, { nullable: true })
    logo: Image;

    @Column('varchar', { nullable: true })
    brandColorPrimary: string;

    @Column('varchar', { nullable: true })
    brandColorSecondary: string;

    @OneToMany(() => Account, account => account.company)
    accounts: Account[]
}
