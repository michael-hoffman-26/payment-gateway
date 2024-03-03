import express from 'express';

import chargeRouter from './charge';
import healthRouter from './health';


const router = express.Router();

router.use("/charge", chargeRouter);
router.use('/health', healthRouter);

export default router;