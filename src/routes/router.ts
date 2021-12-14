import express from 'express';

import chargeRouter from './api/charge';

const router = express.Router();

router.use("/charge", chargeRouter);

export default router;