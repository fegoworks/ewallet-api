/* eslint-disable indent */
import {
  User
} from '../models';
import {
  generateToken,
  handleErrorResponse,
  handleSuccessResponse,
  pickModelAttibutes,
  comparePassword,
  pickUser
} from '../helpers/utils';

/**
 * @description User Controller
 * @class UserController
 */
class UserController {
  /**
   * @description Sign up method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @member UserController
   */
  static async createUser(req, res) {
    let token;
    let newUser;
    const body = pickModelAttibutes(User, req.body);
    try {
      const user = await User.create({
        ...body
      });
      token = generateToken({
        id: user.id,
        isAdmin: user.isAdmin
      });
      newUser = pickUser(user.dataValues);
    } catch (e) {
      if (e.name.startsWith('Sequelize') && e.errors.length) {
        const error = e.errors.shift();
        return handleErrorResponse(res, error.message, 400);
      }
      return handleErrorResponse(res, e, 500);
    }
    return handleSuccessResponse(
      res, {
        ...newUser,
        token,
      },
      201
    );
  }

  /**
   * @description Login method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} User
   * @member UserController
   */
  static async signIn(req, res) {
    try {
      const {
        email,
        password
      } = req.body;

      // Check if email exists
      const isUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!isUser) {
        const error = 'This email does not exist';
        return handleErrorResponse(res, error, 404);
      }

      // Compare password with what's stored in the database
      const isMatch = comparePassword(password, isUser.password);
      if (!isMatch) {
        return handleErrorResponse(res, 'Wrong Password', 401);
      }

      // Generate token
      const token = generateToken({
        id: isUser.id,
      });

      res.cookie('access_token', token, {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: true,
        sameSite: true,
      });

      return res.status(200).json({
        status: 'success',
        message: `Welcome ${isUser.firstName}`,
        data: {
          token,
          userId: isUser.id,
          firstName: isUser.firstName,
          lastName: isUser.lastName,
          email: isUser.email,
        },
      });
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }
}

export default UserController;