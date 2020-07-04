import express from 'express';
import {
  verifyToken
} from '../middlewares/auth/auth.middleware';
import FundingController from '../controllers/funding.controller';

const router = express.Router();

router.post('/fundAccount',
  verifyToken.verify,
  FundingController.fundAccount);

export default router;