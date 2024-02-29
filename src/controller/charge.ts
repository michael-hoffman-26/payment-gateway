import {NextFunction, Request, Response} from "express";

import { chargeCreditCardRetry } from "../service/charge";

export const chargeCreditCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await chargeCreditCardRetry(req.body)

        return res.status(200).json()
    } catch (error) {
        next(error)
    }
};