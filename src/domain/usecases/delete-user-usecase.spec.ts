import {afterEach, describe, expect, it, vi} from 'vitest';
import {UserRepository} from '../../infra/api/repositories/prisma/user-repository';
import {DeleteUserUseCase} from './delete-user-usecase';
import * as validator from '../../infra/helper/validator';

describe('DeleteUserUseCase', () => {

  const userRepositoryMock: any = {
    findByEmail: vi.fn(),
    delete: vi.fn(),
    save: vi.fn(),
    upload: vi.fn(),
    download: vi.fn(),
  };

  const deleteUserUseCase = new DeleteUserUseCase(userRepositoryMock);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a user when valid email is provided', async () => {
    const email = 'johndoe@mail.com';
    userRepositoryMock.findByEmail.mockReturnValue(true);

    await deleteUserUseCase.execute(email);

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(userRepositoryMock.delete).toHaveBeenCalledWith(email);
  });

  it('should return an error if user not found', async () => {
    const email = 'johndoe@mail.com';
    const userPostgresRepositoryStub = new UserRepository();
    const sut = new DeleteUserUseCase(userPostgresRepositoryStub);

    expect(sut.execute(email)).rejects.toThrowError('User not found');
  });

  it('should throw an error when user does not exist', async () => {
    const email = 'johndoe@mail.com';
    userRepositoryMock.findByEmail.mockReturnValue(false);

    await expect(deleteUserUseCase.execute(email)).rejects.toThrow(Error);

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(userRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should throw an error when email validation fails', async () => {
    const email = 'invalid_email';
    const validateEmailSpy = vi.spyOn(validator, 'validateEmail');
    validateEmailSpy.mockImplementation(() => {
      throw new Error('Invalid email');
    });

    await expect(deleteUserUseCase.execute(email)).rejects.toThrow(Error);

    expect(validateEmailSpy).toHaveBeenCalledWith(email);
    expect(userRepositoryMock.findByEmail).not.toHaveBeenCalled();
    expect(userRepositoryMock.delete).not.toHaveBeenCalled();
  });

});


