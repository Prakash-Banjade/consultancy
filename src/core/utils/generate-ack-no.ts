import crypto from 'crypto'

export function generateAckNo() {
    const min = 100000;
    const max = 999999;

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const yearString = currentYear.toString().slice(-2) + '-' + nextYear.toString().slice(-2);

    return String(crypto.randomInt(min, max + 1)) + '/' + yearString;
}