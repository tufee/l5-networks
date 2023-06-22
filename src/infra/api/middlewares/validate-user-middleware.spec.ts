import { prisma } from '../repositories/prisma/prisma-client';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../../server';

describe('ValidateUserMiddleware', async () => {

  beforeEach(async () => {
    // Clear the database before each test
    await prisma.$executeRaw`'TRUNCATE TABLE "User" CASCADE;'`;
  });

  it('should return 200 code if have a valid payload', async () => {

    const data = {
      name: 'John Doe',
      login: 'john',
      email: 'john@mail.com',
      emailConfirmation: 'john@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678'
    };

    const response = await request(app)
      .post('/createUser')
      .send(data);

    console.log(response);
    expect(response.status).toBe(200);
  });

  // it('should return 400 error if any field fails validation', async () => {
  //
  //   const data = {
  //     name: 'John',
  //     login: 'john123',
  //     email: 'john@mail.com',
  //     emailConfirmation: 'john@mail.com',
  //     password: '12345678',
  //     passwordConfirmation: '12345678'
  //   };
  //
  //   const response = await request(app)
  //     .post('/createUsers')
  //     .send(data);
  //
  //   expect(response.status).toBe(400);
  //   expect(response.body.error).toBeTruthy();
  //
  // });
});

