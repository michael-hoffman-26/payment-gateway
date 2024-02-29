import axios from 'axios';
import { DeclineInsufficientFund } from '../errors/DeclineInsufficientClient';

import { GetChargeBody } from '../models/charge';

const visaUrl = process.env.VISA_PAYMENT_URL;
const identifier = process.env.IDENTIFIER || 'Michael_Hoffman';


export const chargeVisa = async (chargeBody: GetChargeBody) => {
    const visaData = {
        fullName: chargeBody.fullName,
        number: chargeBody.creditCardNumber,
        expiration: chargeBody.expirationDate,
        cvv: chargeBody.cvv,
        totalAmount: chargeBody.amount
    };

    return axios({
        method: 'POST',
        url: visaUrl,
        headers: {
            'identifier': identifier
        },
        data: visaData,
    }).then(response => {
        return parseVisaResponse(response)
    });

}

export const parseVisaResponse = (response) => {
    const status = response.status;
    const { chargeResult, resultReason } = response.data;

    if (status === 200 && chargeResult === 'Success') {
        return true;
    } else if (chargeResult === 'Failure' && resultReason === 'Insufficient funds') {
        throw new DeclineInsufficientFund();
    }

    return false;
}
