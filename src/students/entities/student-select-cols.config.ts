import { FindOptionsSelect } from "typeorm";
import { Student } from "./student.entity";

export const studentSelectCols: FindOptionsSelect<Student> = {
    id: true,
    firstName: true,
    lastName: true,
    middleName: true,
    email: true,
    phoneNumber: true,
    dob: true,
    createdAt: true,
    personalInfo: {
        id: true,
        createdAt: true,
        dob: true,
        gender: true,
        maritalStatus: true,
        passportNumber: true,
        passportIssueDate: true,
        passportExpiryDate: true,
        passportIssueCountry: true,
        cityOfBirth: true,
        countryOfBirth: true,
        nationality: true,
        citizenship: true,
        livingAndStudyingCountry: true,
        otherCountrysCitizens: true,
        appliedImmigrationCountry: true,
        medicalCondition: true,
        visaRefusalCountries: true,
        criminalRecord: true,
        emergencyContactName: true,
        emergencyContactPhoneNumber: true,
        emergencyContactEmail: true,
        relationWithApplicant: true,
    },
    academicQualification: {
        id: true,
        countryOfEducation: true,
        highestLevelOfEducation: true,
        levelOfStudies: {
            id: true,
            levelOfStudy: true,
            nameOfBoard: null,
            nameOfInstitution: true,
            countryOfStudy: true,
            stateOfStudy: true,
            cityOfStudy: true,
            degreeAwarded: true,
            gradingSystem: true,
            percentage: true,
            primaryLanguage: true,
            startDate: true,
            endDate: true
        }
    },
    workExperience: {
        id: true,
        nameOfOrganization: true,
        position: true,
        jobProfile: true,
        workingFrom: true,
        workingUpto: true,
        modeOfSalary: true,
        currentlyWorking: true
    },
    document: {
        id: true,
        bankBalanceCertificate: {
            id: true,
            url: true,
        },
        consent_form: {
            id: true,
            url: true,
        },
        english_learning_certificate: {
            id: true,
            url: true,
        },
        financialAffidavit: {
            id: true,
            url: true,
        },
        grade_eleven_marksheet: {
            id: true,
            url: true,
        },
        grade_nine_marksheet: {
            id: true,
            url: true,
        },
        grade_ten_marksheet: {
            id: true,
            url: true,
        },
        grade_twelve_marksheet: {
            id: true,
            url: true,
        },
        ielts: {
            id: true,
            url: true,
        },
        passport: {
            id: true,
            url: true,
        },
    }
}