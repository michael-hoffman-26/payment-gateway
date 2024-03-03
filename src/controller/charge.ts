import {NextFunction, Request, Response} from "express";
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { chargeCreditCardRetry } from "../service/charge";

export const chargeCreditCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await chargeCreditCardRetry(req.body)

        res.status(StatusCodes.CREATED)
        res.json({status: getReasonPhrase(StatusCodes.CREATED)})
    } catch (error) {
        next(error)
    }
};