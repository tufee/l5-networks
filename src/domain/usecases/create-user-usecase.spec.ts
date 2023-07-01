import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {CreateUserUseCase} from './create-user-usecase';
import {UserRepository} from '../../infra/api/repositories/prisma/user-repository';
import {Encrypter} from '../../infra/helper/encrypter';

describe('CreateUserUseCase', () => {
  let userPostgresRepository: UserRepository;
  let encrypter: Encrypter;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userPostgresRepository = new UserRepository();
    encrypter = new Encrypter();
    createUserUseCase = new CreateUserUseCase(userPostgresRepository, encrypter);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if user is already registered', async () => {
    const existingUser: any = {
      id: 'uuid',
      login: 'john',
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    vi.spyOn(userPostgresRepository, 'findByEmail').mockReturnValue(existingUser);

    const newUser = {
      name: 'Jane Doe',
      login: 'john',
      email: 'johndoe@example.com',
      emailConfirmation: 'johndoe@example.com',
      password: 'password',
      passwordConfirmation: 'password',
    };

    await expect(createUserUseCase.execute(newUser)).rejects.toThrowError('User already registered');
    expect(userPostgresRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
  });

  it('should create a new user if all data is valid and user is not already registered', async () => {
    const newUser: any = {
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      emailConfirmation: 'johndoe@example.com',
      password: 'encryptedPassword',
      passwordConfirmation: 'encryptedPassword',
    };

    vi.spyOn(userPostgresRepository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(encrypter, 'encrypt').mockResolvedValue('encryptedPassword');
    vi.spyOn(userPostgresRepository, 'save').mockResolvedValue(newUser);

    const result = await createUserUseCase.execute(newUser);

    expect(userPostgresRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    expect(encrypter.encrypt).toHaveBeenCalledWith(newUser.password);
    expect(userPostgresRepository.save).toHaveBeenCalledWith({
      ...newUser,
      password: 'encryptedPassword',
    });
    expect(result).toEqual(newUser);
  });
});
