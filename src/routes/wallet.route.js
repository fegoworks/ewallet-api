import express from 'express';
import {
  verifyToken
} from '../middlewares/auth/auth.middleware';
import FundingController from '../controllers/funding.controller';
import WalletController from '../controllers/wallet.controller';

const router = express.Router();

router.post('/fundAccount',
  verifyToken.verify,
  FundingController.fundAccount);

router.post('/wallets/transfer',
  verifyToken.verify,
  WalletController.transferToWallet);

router.get('/wallets/:customerId',
  verifyToken.verify,
  WalletController.getWallet);

router.get('/transactions/:accountNumber',
  verifyToken.verify,
  WalletController.getWalletTransactions);

export default router;