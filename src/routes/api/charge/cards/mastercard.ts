import axios from 'axios';
import { DeclineInsufficientFund } from '../../../../errors/DeclineInsufficientClient';
import { GetChargeBody } from '../../../../models/charge';

const mastercardUrl = process.env.MASTERCARD_PAYMENT_URL;
const identifier = process.env.IDENTIFIER || 'Michael_Hoffman';

export const chargeMasterCardRetry = (chargeBody: GetChargeBody) => {
    const splittedFullName = chargeBody.fullName.split(' ');
    const splittedExpirationDate = chargeBody.expirationDate.split('/');
    const expiration = splittedExpirationDate[0] + '-' + splittedExpirationDate[1];

    const mastercardData = {
        first_name: splittedFullName[0],
        last_name: splittedFullName[1],
        card_number: chargeBody.creditCardNumber,
        expiration,
        cvv: chargeBody.cvv,
        charge_amount: chargeBody.amount
    };

    return axios({
        method: 'POST',
        url: mastercardUrl,
        headers: {
            'identifier': identifier
        },
        data: mastercardData,
    }).then(response => {
        return parseMastercardResponse(response)
    })
        .catch(axiosError => {
            const { status, data } = axiosError.response;
            if (status === 400 && data.decline_reason === 'Insufficient funds') {
                throw new DeclineInsufficientFund();
            } else if (status === 400 && data.decline_reason === 'Card declined') {
                return false;
            } else {
                throw axiosError;
            }
        });
}

export const parseMastercardResponse = (response) => {
    return response.status === 200;
}










