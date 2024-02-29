import { BaseError } from '../errors/baseError';

const errorHandler = (error, req, res) => {
    if (error instanceof BaseError) {
        printError(error, true);
        return res.status(error.httpCode).json({ error: error.details })
    } else {
        printError(error, false);
        return res.status(500).json()
    }
}

export const printError = (error: Error, catchedError: boolean) => {
    console.error({ catchedError, error });
}

export default errorHandler;
