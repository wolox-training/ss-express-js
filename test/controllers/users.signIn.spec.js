const supertest = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const User = require('../../app/models').Users;
const { encryptPassword } = require('../../app/services/user');

const request = supertest(app);
factory.define('user', User, {});

describe('POST /users/sessions', () => {
  beforeEach(async () => {
    const hash = await encryptPassword('sfrias12345');
    factory.create('user', {
      id: 1,
      firstName: 'Sherman',
      lastName: 'Frias',
      password: hash,
      email: 'sfrias@wolox.com',
      role: 'user'
    });
  });

  test('with a valid data, should be create a new session', async () => {
    const { body, statusCode } = await request.post('/users/sessions').send({
      email: 'sfrias@wolox.com',
      password: 'sfrias12345'
    });

    expect(statusCode).toBe(200);
    expect(body.first_name).toEqual('Sherman');
  });

  test('with a invalid email, should be throw a error', async () => {
    const { body, statusCode } = await request.post('/users/sessions').send({
      email: 'sfrias@gmail.com',
      password: 'sfrias12345'
    });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Email y/o contraseña inválidos.');
  });

  test('with a invalid password, should be throw a error', async () => {
    const { body, statusCode } = await request.post('/users/sessions').send({
      email: 'sfrias@wolox.com',
      password: 'sfrias1234578910'
    });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Email y/o contraseña inválidos.');
  });
});
