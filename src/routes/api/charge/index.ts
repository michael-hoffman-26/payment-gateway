import express from 'express'

import { validateRequest } from '../../../validator/validator';
import { chargeCreditCard } from '../../../controller/charge';
import { postChargeValidator, } from './validators';

const router = express.Router();


router.post('',
    postChargeValidator,
    validateRequest,
    chargeCreditCard
);

export default router;
