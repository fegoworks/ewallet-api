import {
  Funding,
  Wallet,
  Transaction
} from '../models';
import initiatePayment from './payment.service';

/**
 * @description Generate random numbers
 * @returns {Number} numbers
 */
export const generateNumber = () => {
  let str = '';
  const characters = '123456789';
  for (let i = 0; i < 8; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return Number(str);
};

const fundingService = async (customerId, email, body) => {
  let accountNumber;
  try {
    const response = await initiatePayment(email, body);
    const {
      reference,
      amount,
    } = response.data;
    const funding = await Funding.create({
      customerId,
      amount,
      reference,
    });

    const userWallet = await Wallet.findOne({
      where: {
        customerId
      }
    });

    if (userWallet) {
      userWallet.balance += amount;
      userWallet.save();
    }

    if (userWallet === null) {
      accountNumber = generateNumber();

      await Wallet.create({
        customerId,
        accountNumber,
        balance: amount
      });
    }
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.accountNumber = accountNumber || userWallet.accountNumber;
    transaction.narration = `fund_account_wallet: ${accountNumber || userWallet.accountNumber}`;
    transaction.type = 'funding';
    await transaction.save();

    return funding;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fundingService;