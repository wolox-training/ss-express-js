const supertest = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const User = require('../../app/models').Users;
const { encryptPassword } = require('../../app/services/user');
const { sign } = require('../../app/utils/crypto');

const request = supertest(app);
factory.define('user', User, {});

describe('GET /users', () => {
  beforeEach(async () => {
    const hash1 = await encryptPassword('sfrias12345');
    factory.create('user', {
      id: 1,
      firstName: 'Sherman',
      lastName: 'Frias',
      password: hash1,
      email: 'sfrias@wolox.com',
      role: 'user'
    });
    const hash2 = await encryptPassword('sspadea12345');
    factory.create('user', {
      id: 2,
      firstName: 'Sebastian',
      lastName: 'Spadea',
      password: hash2,
      email: 'sspadea@wolox.com',
      role: 'user'
    });
    const hash3 = await encryptPassword('nsosa12345');
    factory.create('user', {
      id: 3,
      firstName: 'Nicolas',
      lastName: 'Sosa',
      password: hash3,
      email: 'nsosa@wolox.com',
      role: 'user'
    });
    const hash4 = await encryptPassword('nwaity12345');
    factory.create('user', {
      id: 4,
      firstName: 'Nicolas',
      lastName: 'Waity',
      password: hash4,
      email: 'nwaity@wolox.com',
      role: 'user'
    });
    const hash5 = await encryptPassword('fefuti12345');
    factory.create('user', {
      id: 5,
      firstName: 'Fefuti',
      lastName: 'Frias',
      password: hash5,
      email: 'fefuti@wolox.com',
      role: 'user'
    });
  });

  test('with a valid token, it must list all users', async () => {
    const token = sign({ id: 5 });
    const { body, statusCode } = await request.get('/users').set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);
    expect(body.users.rows[4].id).toBe(5);
  });

  test('with a valid token, should be paginate the list of users', async () => {
    const token = sign({ id: 2 });
    const { body, statusCode } = await request
      .get('/users?page=2&limit=3')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);
    expect(body.users.rows[1].id).toBe(5);
  });

  test('with a invalid token, should be throw a error', async () => {
    const token = 'hi';
    const { body, statusCode } = await request.get('/users').set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Token inválido');
  });

  test('with a invalid page query, should be throw a error', async () => {
    const token = sign({ id: 2 });
    const { body, statusCode } = await request
      .get('/users?page=hi&limit=3')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(400);
    expect(body.message[0].msg).toBe('Page must be a number.');
  });

  test('with a invalid limit query, should be throw a error', async () => {
    const token = sign({ id: 2 });
    const { body, statusCode } = await request
      .get('/users?page=1&limit=hi')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(400);
    expect(body.message[0].msg).toBe('Limit must be a number.');
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });
});
