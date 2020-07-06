/** @format */
import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../app';
import { User } from '../models';

const sandbox = sinon.createSandbox();

describe('SignUp/SignIn API', () => {
  let userOne;
  let userTwo;

  beforeEach(async () => {
    userOne = {
      lastName: 'Greg',
      firstName: 'Okeke',
      email: 'gigs@mail.com',
      password: 'password',
    };

    userTwo = {
      lastName: 'Edafe',
      firstName: 'Oghenefego',
      email: 'fego@mail.com',
      password: 'password',
    };

    await User.destroy({ truncate: { cascade: true } });
    await User.create(userOne);
  });

  afterEach(() => sandbox.restore());

  describe('POST /api/v1/auth/create-user', () => {
    it('should register a new user', () =>
      request(app)
        .post('/api/v1/auth/create-user')
        .send(userTwo)
        .then((response) => {
          delete userTwo.password;
          expect(response.status).to.equal(201);
          expect(response.body.data).to.be.an('object');
        }));

    it('should report error when email already exists', () =>
      request(app)
        .post('/api/v1/auth/create-user')
        .send(userOne)
        .then((response) => {
          expect(response.status).to.equal(409);
        }));

    it('should report error when the email provided is not valid', () => {
      userTwo.email = 'this_is_not_an_email';
      return request(app)
        .post('/api/v1/auth/create-user')
        .send(userTwo)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal(
            'A valid email address is required'
          );
        });
    });

    it('should report error when first name and last name are not provided', () =>
      request(app)
        .post('/api/v1/auth/create-user')
        .send({})
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('First Name is required');
        }));
  });

  // User sign in
  describe('POST /api/v1/auth/signin', () => {
    it('should return a token when email and password matches', () =>
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'gigs@mail.com',
          password: 'password',
        })
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.a.property('token');
          expect(response.body.data).to.be.an('object');
        }));

    it('should report error when email and password are not provided', () =>
      request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal(
            'A valid email address is required'
          );
        }));

    it('should report error when the email provided is not valid', () =>
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'this_is_not_an_email',
          password: 'password',
        })
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal(
            'A valid email address is required'
          );
        }));

    it("should report error when email and password don't match", () =>
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'gigs@mail.com',
          password: 'passwordxvb',
        })
        .then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal('Wrong Password');
        }));

    it('should report error when email is not registered', () =>
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'fegolambo@mail.com',
          password: 'passwordxvb',
        })
        .then((response) => {
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('This email does not exist');
        }));
  });
});
