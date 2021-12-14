import { DeclineInsufficientFund } from "../../../errors/DeclineInsufficientClient";
import { GetChargeBody } from "../../../models/charge";
import { chargeMasterCardRetry } from "./cards/mastercard";
import { chargeVisa } from "./cards/visa";


const creditCardCompanies = {
    visa: chargeVisa,
    mastercard: chargeMasterCardRetry
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const MAX_RETRY = 3

export const chargeCreditCardRetry = async (requestBody: GetChargeBody): Promise<any> => {
    let retryCount = 0;

    while (retryCount <= MAX_RETRY) {
        await delay(1000 * Math.pow(retryCount, 2));
        const isSucceeded = await creditCardCompanies[requestBody.creditCardCompany](requestBody);

        console.debug('[DL: chargeCreditCardRetry]', isSucceeded, retryCount)

        if (isSucceeded === false) {
            retryCount++
        } else {
            return isSucceeded;
        }
    }
    // The card declined more then 3 times, return error
    throw new DeclineInsufficientFund();
}
