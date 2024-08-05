import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFutureYearConstraint implements ValidatorConstraintInterface {
    validate(year: any, args: ValidationArguments) {
        if (typeof year !== 'number' || !Number.isInteger(year) || year.toString().length !== 4) {
            return false;
        }
        const currentYear = new Date().getFullYear();
        return year >= currentYear;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Year must be a valid 4-digit integer and cannot be a past year';
    }
}

export function IsFutureYear(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureYearConstraint,
        });
    };
}
