/** @format */
import request from 'supertest';
import {
  expect
} from 'chai';
import sinon from 'sinon';
import app from '../app';
import {
  User,
  Wallet
} from '../models';
import {
  generateToken
} from '../helpers/utils';

const sandbox = sinon.createSandbox();

describe('Wallets API', async () => {
  let accessToken;
  let card;
  let wallets;

  beforeEach(async () => {
    card = {
      amount: '15500000',
      cvv: '408',
      number: '4084084084084081',
      expiry_month: '01',
      expiry_year: '2099'
    };
    const customers = {
      one: {
        id: '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
        firstName: 'feggie',
        lastName: 'edafe',
        email: 'feggie@mail.com',
        password: 'password',
        isAdmin: false
      },
      two: {
        id: '65863249-4600-4dd6-b601-7e1947b51bc8',
        firstName: 'feggie',
        lastName: 'edafe',
        email: 'fego@mail.com',
        password: 'password'
      }
    };
    wallets = {
      one: {
        id: '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
        customerId: '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
        accountNumber: 12345678,
        balance: 20000
      },
      two: {
        id: '99586612-b7d3-48dc-8831-2405b1766600',
        customerId: '65863249-4600-4dd6-b601-7e1947b51bc8',
        accountNumber: 67899443,
        balance: 20000
      }
    };
    await User.destroy({
      truncate: {
        cascade: true
      }
    });
    await Wallet.destroy({
      truncate: {
        cascade: true
      }
    });

    await User.create(customers.one);
    await User.create(customers.two);

    accessToken = generateToken(customers.one);
  });

  afterEach(() => sandbox.restore());

  describe('POST /api/v1/fundAccount', () => {
    it('should fund the wallet if credentials are correct', () => request(app)
      .post('/api/v1/fundAccount')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(card)
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.data).to.be.an('object');
      }));

    it('should not fund the wallet if amount is missing', () => {
      delete card.amount;
      return request(app)
        .post('/api/v1/fundAccount')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(card)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Please enter amount');
        });
    });
    it('should not fund the wallet if number is missing', () => {
      delete card.number;
      return request(app)
        .post('/api/v1/fundAccount')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(card)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Enter a valid card number string');
        });
    });
    it('should not fund the wallet if cvv is missing', () => {
      delete card.cvv;
      return request(app)
        .post('/api/v1/fundAccount')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(card)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Enter a valid CVV');
        });
    });
    it('should not fund the wallet if expiry month is missing', () => {
      delete card.expiry_month;
      return request(app)
        .post('/api/v1/fundAccount')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(card)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Enter an expiry month');
        });
    });
    it('should not fund the wallet if amount is missing', () => {
      delete card.expiry_year;
      return request(app)
        .post('/api/v1/fundAccount')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(card)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Enter an expiry year');
        });
    });
  });
});