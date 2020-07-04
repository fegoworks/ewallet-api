/**
 * /* eslint-disable indent
 *
 * @format
 */

import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../helpers/utils';
import fundingService from '../services/funding.service';
/**
 * @description Funding Controller
 * @class FundingController
 */
class FundingController {
  /**
   * @description Fund Account method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Funding
   * @member FundingController
   */
  static async fundAccount(req, res) {
    try {
      const customerId = req.id;
      const funding = await fundingService(customerId, req.body);
      return handleSuccessResponse(res, funding);
    } catch (error) {
      return handleErrorResponse(res, error, 500);
    }
  }
}

export default FundingController;