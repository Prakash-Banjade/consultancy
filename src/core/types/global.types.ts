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
    companyId: string;
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

export enum EGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum EIeltsType {
    GENERAL = 'general',
    ACADEMIC = 'academic',
    UKVI = 'ukvi',
}

export enum EMaritalStatus {
    MARRIED = 'married',
    UNMARRIED = 'unmarried',
    DIVORCED = 'divorced',
    WIDOWED = 'widowed',
    SEPARATED = 'separated',
    OTHER = 'other',
}

export enum ELevelOfEducation {
    POSTGRADUATE = 'postgraduate',
    UNDERGRADUATE = 'undergraduate',
    GRADETWELVE = 'grade12',
    GRADETEN = 'grade10',
}

export enum EGradingSystem {
    CGPA = 'cgpa',
    PERCENTAGE = 'percentage',
    MARKS = 'marks',
    SCALE = 'scale',
}

export enum EModeOfSalary {
    CASH = 'cash',
    BANK = 'bank',
    CHEQUE = 'cheque',
}

export enum EApplicationPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    NONE = 'none',
}

export enum EApplicationStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}