import { FindOptionsSelect } from "typeorm";
import { File } from "./file.entity";

export const fileSelectColumns: FindOptionsSelect<File> = {
    id: true,
    url: true,
    size: true,
    format: true,
    originalName: true,
    name: true,
    memeType: true,
    createdAt: true,
    uploadedBy: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
    }
}