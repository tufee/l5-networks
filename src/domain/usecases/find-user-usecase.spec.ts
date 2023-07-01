import {beforeEach, describe, expect, it, vi} from 'vitest';
import { prisma } from '../../infra/api/repositories/prisma/prisma-client';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { CreateUserUseCase } from './create-user-usecase';
import { FindUserUseCase } from './find-user-usecase';
import {IUserResponse} from "./create-user-dto";

describe('FindUserUseCase', () => {
  let userRepository: UserRepository;
  let findUserUseCase: FindUserUseCase;

  beforeEach(async () => {
    userRepository = new UserRepository();
    findUserUseCase = new FindUserUseCase(userRepository);
  });

  it('should return user when found', async () => {
    const email = 'johndoe@mail.com';

    const expectedUser: any = {
      id: 'id',
      name: 'Jane Doe',
      login: 'john',
      email: 'john@mail.com',
    };

    vi.spyOn(userRepository, 'findByEmail').mockReturnValue(expectedUser);

    const result = await findUserUseCase.execute(email);

    expect(result).toEqual(expectedUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error when user not found', async () => {
    const email = 'johndoe@example.com';

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(findUserUseCase.execute(email)).rejects.toThrowError('User not found');
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });
});


