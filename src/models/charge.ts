export interface GetChargeBody {
    fullName: string,
    creditCardNumber: string,
    creditCardCompany: CreditCardCompany,
    expirationDate: string,
    cvv: string,
    amount: number
}

export enum CreditCardCompany {
    visa = 'visa',
    mastercard = 'mastercard'
}