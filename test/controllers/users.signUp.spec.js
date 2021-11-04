const supertest = require('supertest');
const app = require('../../app');
const User = require('../../app/models').Users;

const request = supertest(app);

describe('POST /users', () => {
  test('with a valid data, should be create a new user', async () => {
    const { body, statusCode } = await request.post('/users').send({
      first_name: 'Jorge',
      last_name: 'Rodriguez',
      email: 'jorge.rodriguez@wolox.com',
      password: 'abcdefgh12345'
    });

    const createdUser = await User.findOne({ where: { email: 'jorge.rodriguez@wolox.com' } });

    expect(statusCode).toBe(201);
    expect(body).toEqual({ first_name: 'Jorge' });
    expect(createdUser.firstName).toBe('Jorge');
    expect(createdUser.lastName).toBe('Rodriguez');
    expect(createdUser.email).toBe('jorge.rodriguez@wolox.com');
  });

  test('with a invalid email, should be throw a error', async () => {
    const { body, statusCode } = await request.post('/users').send({
      first_name: 'Jorge',
      last_name: 'Rodriguez',
      email: 'jorge.rodriguez@gmail.com',
      password: 'abcdefgh12345'
    });

    const createdUser = await User.findOne({ where: { email: 'jorge.rodriguez@wolox.com' } });

    expect(statusCode).toBe(400);
    expect(body.message[0].msg).toBe('Email inválido');
    expect(createdUser).toBe(null);
  });

  test('with a too short password, should be throw a error', async () => {
    const { body, statusCode } = await request.post('/users').send({
      first_name: 'Jorge',
      last_name: 'Rodriguez',
      email: 'jorge.rodriguez@wolox.com',
      password: 'ab'
    });

    const createdUser = await User.findOne({ where: { email: 'jorge.rodriguez@wolox.com' } });

    expect(statusCode).toBe(400);
    expect(body.message[0].msg).toBe('Contraseña demasiado corta');
    expect(createdUser).toBe(null);
  });

  test('without a alphanumeric password, should be throw a error', async () => {
    const { body, statusCode } = await request.post('/users').send({
      first_name: 'Jorge',
      last_name: 'Rodriguez',
      email: 'jorge.rodriguez@wolox.com',
      password: 'abcdefgh@!'
    });

    const createdUser = await User.findOne({ where: { email: 'jorge.rodriguez@wolox.com' } });

    expect(statusCode).toBe(400);
    expect(body.message[0].msg).toBe('La contraseña solo debe contener letras y números');
    expect(createdUser).toBe(null);
  });
});
