import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @Column({ type: 'varchar' })
    name: string;
}
