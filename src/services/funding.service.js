import {
  Funding,
  Wallet
} from '../models';
import initiatePayment from '../helpers/payment';

const fundingService = async (customerId, body) => {
  try {
    const response = await initiatePayment(body);
    const {
      reference,
      amount,
    } = response.data;

    const funding = await Funding.create({
      customerId,
      amount,
      email: body.email,
      reference
    });
    const userWallet = await Wallet.findOne({
      where: {
        customerId
      }
    });
    userWallet.balance = +amount;
    await userWallet.save();

    const companyWallet = await Wallet.findOne({
      where: {
        type: 'company'
      }
    });
    companyWallet.balance = +amount;
    await companyWallet.save();
    return funding;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fundingService;