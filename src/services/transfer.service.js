import {
  Transaction,
  Wallet,
} from '../models';

const transferService = async (amount, accountNumber, customerId) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        customerId
      }
    });

    const receivingWallet = await Wallet.findOne({
      where: {
        accountNumber
      }
    });

    if (wallet.balance > amount) {
      wallet.balance -= amount;
      receivingWallet.balance += amount;

      await wallet.save();
      await receivingWallet.save();

      const transaction = new Transaction();
      transaction.amount = -amount;
      transaction.accountNumber = wallet.accountNumber;
      transaction.narration = `transfer_to_account: ${accountNumber}`;
      transaction.type = 'transfer';
      await transaction.save();

      const transactionRecipient = new Transaction();
      transactionRecipient.amount = amount;
      transactionRecipient.accountNumber = accountNumber;
      transactionRecipient.narration = `transfer_from_account: ${wallet.accountNumber}`;
      transactionRecipient.type = 'transfer';
      await transactionRecipient.save();
      return {
        transaction,
        wallet
      };
    }
    if (receivingWallet === null) {
      return Promise.reject(new Error({
        message: 'Account number does not exist',
        status: 404
      }));
    }
    return Promise.reject(new Error({
      message: 'Insufficient funds in wallet',
      status: 400
    }));
  } catch (error) {
    return Promise.reject(error);
  }
};

export default transferService;