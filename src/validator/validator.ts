import { validationResult } from 'express-validator';
import { Response } from 'express';

export const validateRequest = (req, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array())
        return res.status(400).json();
    }
    next();
}