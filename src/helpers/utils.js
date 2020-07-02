import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} password
 * @param {string} hashPwd
 * @return {string} hash
 */
export const comparePassword = (password, hashPwd) => bcrypt.compareSync(password, hashPwd);

export const handleSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json({
  status: 'success',
  data,
});

export const handleErrorResponse = (res, error, statusCode = 400) => res.status(statusCode).json({
  status: 'Request Failed',
  error,
});

/**
 * @param {object} payload
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
export const generateToken = (
  payload,
  tokenExpiryDate = '2h',
  secret = process.env.SECRET
) => jwt.sign(payload, secret, {
  expiresIn: tokenExpiryDate,
});

/**
 * @param {string} token
 * @return {object} decodeToken
 */
export const decodeToken = (token) => jwt.verify(token, process.env.SECRET);

/**
 * @param {string} object
 * @param {string} keys
 * @return {object} obj
 */
export const pickObj = (object, keys) => keys.reduce((obj, key) => {
  if (object && object.hasOwnProperty(key)) {
    obj[key] = object[key];
  }
  return obj;
}, {});

/**
 * @param {object} rawUser
 * @return {object} new
 */
export const pickUser = (rawUser) => {
  const attributes = ['isAdmin'];
  attributes.forEach((attr) => (rawUser[attr] ? null : delete rawUser[attr]));
  const {
    password,
    ...user
  } = rawUser;
  return user;
};

/**
 * @param {Object} model
 * @param {Object} object
 * @return {Array} attributes
 */
export const pickModelAttibutes = (model, object) => {
  const defaultAttributes = model.rawAttributes;
  const {
    createdAt,
    updatedAt,
    ...otherAttributes
  } = defaultAttributes;
  const attributes = Object.keys(otherAttributes);
  return pickObj(object, attributes);
};