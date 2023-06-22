import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '../../infra/api/repositories/prisma/prisma-client';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { CreateUserUseCase } from './create-user-usecase';
import { DeleteUserUseCase } from './delete-user-usecase';

describe('DeleteUserUseCase', () => {

  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.upload.deleteMany();
  });

  it('should delete user', async () => {

    const email = 'johndoe@mail.com';
    const userPostgresRepositoryStub = new UserRepository();
    const encrypter = new Encrypter();

    const createUserSut = new CreateUserUseCase(userPostgresRepositoryStub, encrypter);

    const sut = new DeleteUserUseCase(userPostgresRepositoryStub);
    const deleteSpy = vi.spyOn(userPostgresRepositoryStub, 'delete');

    const newUser: any = {
      name: 'Jane Doe',
      login: 'john',
      email,
      emailConfirmation: email,
      password: 'abcdefgh',
      passwordConfirmation: 'abcdefgh',
    };

    await createUserSut.execute(newUser);

    await sut.execute(email);

    expect(deleteSpy).toHaveBeenCalledOnce();
    expect(deleteSpy).toHaveBeenCalledWith('johndoe@mail.com');
  });

  it('should return an error if user not found', async () => {
    const email = 'johndoe@mail.com';
    const userPostgresRepositoryStub = new UserRepository();
    const sut = new DeleteUserUseCase(userPostgresRepositoryStub);

    expect(sut.execute(email)).rejects.toThrowError('User not found');
  });

});


