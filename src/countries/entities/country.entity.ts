import { BaseEntity } from "src/core/entities/base.entity";
import { File } from "src/files/entities/file.entity";
import { University } from "src/universities/entities/university.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Country extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string

    @OneToOne(() => File)
    @JoinColumn()
    image: File;

    @Column({ type: 'simple-array' })
    states: string[]

    @OneToMany(() => University, university => university.country)
    universities: University[]
}
