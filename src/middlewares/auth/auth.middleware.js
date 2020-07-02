/* eslint-disable operator-linebreak */
import jwt from 'jsonwebtoken';
import {
  handleErrorResponse
} from '../../helpers/utils';

const secret = process.env.SECRET;

export const verifyToken = {
  verify(req, res, next) {
    if (req.headers.authorization === undefined) {
      return handleErrorResponse(res, 'No token provided.', 403);
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return handleErrorResponse(res, 'Failed to authenticate token.', 500);
      }
      req.id = decoded.id;
      req.isAdmin = decoded.isAdmin;
      return next();
    });
  },
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {object} decodeToken
 */
export const validateAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }
  return handleErrorResponse(res, 'You are not authorized to use this route', 403);
};