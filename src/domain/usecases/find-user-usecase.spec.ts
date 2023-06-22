import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '../../infra/api/repositories/prisma/prisma-client';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { CreateUserUseCase } from './create-user-usecase';
import { FindUserUseCase } from './find-user-usecase';

describe('FindUserUseCase', () => {
  let userRepository: UserRepository;
  let encrypter: Encrypter;
  let createUserUseCase: CreateUserUseCase;
  let findUserUseCase: FindUserUseCase;

  beforeEach(async () => {
    userRepository = new UserRepository();
    encrypter = new Encrypter();
    createUserUseCase = new CreateUserUseCase(userRepository, encrypter);
    findUserUseCase = new FindUserUseCase(userRepository);

    await prisma.user.deleteMany();
    await prisma.upload.deleteMany();
  });

  it('should find user', async () => {
    const email = 'johndoe@mail.com';

    const newUser: any = {
      name: 'Jane Doe',
      login: 'john',
      email,
      emailConfirmation: email,
      password: 'abcdefgh',
      passwordConfirmation: 'abcdefgh',
    };

    await createUserUseCase.execute(newUser);

    const response = await findUserUseCase.execute(email);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('login');
    expect(response).toHaveProperty('email');
  });

  it('should return an error if user not found', async () => {
    const email = 'johndoe@mail.com';

    expect(findUserUseCase.execute(email)).rejects.toThrowError('User not found');
  });

});


