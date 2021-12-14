import { BaseError } from "./baseError";

export class DeclineInsufficientFund extends BaseError {
    constructor() {
        super('Insufficient Fund', 200, 'Card declined');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DeclineInsufficientFund.prototype);
    }
}