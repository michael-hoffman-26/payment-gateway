import express from 'express'

import { validateRequest } from '../../../validator/validator';
import { chargeCreditCardRoute } from './routes/getCharge';
import { postChargeValidator, } from './validator';

const router = express.Router();


router.post('',
    postChargeValidator,
    validateRequest,
    chargeCreditCardRoute
);

export default router;
