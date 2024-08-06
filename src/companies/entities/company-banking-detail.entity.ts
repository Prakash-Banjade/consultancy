import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { File } from "src/files/entities/file.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class CompanyBankingDetail extends BaseEntity {
    @Column('varchar')
    concerningPersonName: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    contactNumber: string;

    @Column('varchar')
    vatNumber: string;

    @Column('int')
    panNumber: number;

    @OneToOne(() => File)
    @JoinColumn({ name: 'panCertificate' })
    panCertificate: File;

    @Column('varchar')
    benificiaryName: string;

    @Column('varchar')
    accountNumber: string;

    @Column('varchar')
    bankName: string;

    @Column('varchar')
    bankLocation: string;

    @Column({ type: 'enum', enum: ECountry })
    bankCountry: ECountry;

    @Column('varchar')
    bankState: string;

    @Column('varchar')
    bankCity: string;

    @Column('varchar', { nullable: true })
    msmeRegNumber: string;

    @Column({ type: 'datetime', nullable: true })
    msmeRegDate: string;

    @OneToOne(() => Company, company => company.bankingDetail)
    company: Company;
}