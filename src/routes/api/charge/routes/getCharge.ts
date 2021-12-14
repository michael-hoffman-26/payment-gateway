import { Request, Response, NextFunction } from 'express';

import { chargeCreditCardRetry } from '../DL';

export const chargeCreditCardRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await chargeCreditCardRetry(req.body)

        return res.status(200).json()
    } catch (error) {
        next(error)
    }
};