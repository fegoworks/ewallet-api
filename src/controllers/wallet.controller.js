/**
 * /* eslint-disable indent
 *
 * @format
 */

import {
  Wallet,
  Transaction
} from '../models';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../helpers/utils';
import transferService from '../services/transfer.service';
/**
 * @description wallet Controller
 * @class walletController
 */
class WalletController {
  /**
   * @description Transfer
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} transfer
   * @member WalletController
   */
  static async transferToWallet(req, res) {
    try {
      const customerId = req.id;
      const transfer = await transferService(req.body.amount, req.body.accountNumber, customerId);
      return handleSuccessResponse(res, transfer, 201);
    } catch (error) {
      return handleErrorResponse(res, error, 500);
    }
  }

  /**
   * @description View Wallet
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} wallet
   * @member WalletController
   */
  static async getWallet(req, res) {
    try {
      const customerId = req.id || req.params.id;
      const wallet = await Wallet.findOne({
        where: {
          customerId
        }
      });
      return handleSuccessResponse(res, wallet, 200);
    } catch (error) {
      return handleErrorResponse(res, error, 500);
    }
  }

  /**
   * @description View Wallet transactions
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} transactions
   * @member WalletController
   */
  static async getWalletTransactions(req, res) {
    try {
      const {
        accountNumber
      } = req.params;
      const transactions = await Transaction.findAll({
        where: {
          accountNumber
        }
      });
      return handleSuccessResponse(res, transactions, 200);
    } catch (error) {
      return handleErrorResponse(res, error, 500);
    }
  }
}

export default WalletController;