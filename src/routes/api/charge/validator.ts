import { body, header, CustomValidator, ValidationChain } from 'express-validator';
import { CreditCardCompany } from '../../../models/charge';

const isValidCreditCardCompany: CustomValidator = (value) => {
    if (!Object.values(CreditCardCompany).includes(value)) {
        throw new Error('Invalid credit car company');
    }

    // Indicates the success of this synchronous custom validator
    return true;
};

const isLengthEquals2 = (number): boolean => {
    return number.toString().length === 2;
}

const isValidExpirationDate: CustomValidator = (value) => {
    const month = +value.split('/')[0];
    const year = +value.split('/')[1];

    const isMonthValid = Number.isInteger(month) && isLengthEquals2(month);
    const isYearValid = Number.isInteger(year) && isLengthEquals2(year);

    if (!(isMonthValid && isYearValid)) {
        throw new Error('Invalid expiration date');
    }

    // Indicates the success of this synchronous custom validator
    return true;
};

export const postChargeValidator: ValidationChain[] = [
    header('merchant-identifier').exists().isString().toLowerCase().notEmpty(),
    body('fullName').exists().trim().isString().toLowerCase().notEmpty(),
    body('creditCardNumber').exists().trim().isString().toLowerCase().notEmpty(),
    body('creditCardCompany').exists().trim().isString().toLowerCase().notEmpty()
        .custom(isValidCreditCardCompany),
    body('expirationDate').exists().trim().isString().toLowerCase().notEmpty()
        .custom(isValidExpirationDate),
    body('cvv').exists().trim().isString().toLowerCase().notEmpty(),
    body('amount').exists().trim().isDecimal()
];