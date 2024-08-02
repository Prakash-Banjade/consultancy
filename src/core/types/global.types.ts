export enum Roles {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    COUNSELLER = 'counsellor',
    STUDENT = 'student',
    USER = 'user',
}

export interface AuthUser {
    userId: string;
    accountId: string;
    name: string;
    email: string;
    role: Roles;
}

export enum Action {
    MANAGE = 'manage',
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    RESTORE = 'restore',
}

export enum AuthProvider {
    GOOGLE = 'google',
    CREDENTIALS = 'credentials',
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum EIeltsType {
    GENERAL = 'general',
    ACADEMIC = 'academic',
    UKVI = 'ukvi',
}