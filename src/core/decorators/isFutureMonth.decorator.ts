import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { EMonth } from '../types/months.types';

@ValidatorConstraint({ async: false })
export class IsFutureMonthConstraint implements ValidatorConstraintInterface {
    validate(month: any, args: ValidationArguments) {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' }).toLowerCase();
        const currentYear = currentDate.getFullYear();
        const year = (args.object as any).year;

        if (typeof year !== 'number' || !Number.isInteger(year) || year.toString().length !== 4) {
            return false;
        }

        const months = Object.values(EMonth);
        if (!months.includes(month)) {
            return false;
        }

        const monthIndex = months.indexOf(month);
        const currentMonthIndex = months.indexOf(currentMonth as EMonth);

        if (year === currentYear) {
            return monthIndex >= currentMonthIndex;
        } else if (year >= currentYear) {
            return true;
        }
        return false;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Month cannot be a past month';
    }
}

export function IsFutureMonth(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureMonthConstraint,
        });
    };
}
