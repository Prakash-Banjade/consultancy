import { BadRequestException } from "@nestjs/common";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseEntity } from "src/core/entities/base.entity";

@Entity()
export class Counselor extends BaseEntity {
    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    phoneNumber: string;

    @Column('varchar')
    password: string;

    @BeforeInsert()
    hashPassword() {
        if (!this.password) throw new BadRequestException('Password is required');

        this.password = bcrypt.hashSync(this.password, 10);
    }
}
