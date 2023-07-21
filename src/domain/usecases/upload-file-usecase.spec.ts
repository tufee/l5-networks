import { Request } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { UploadFileUseCase } from './upload-file-usecase';

describe('UploadFileUseCase', () => {
  let userRepository: UserRepository;
  let uploadFileUseCase: UploadFileUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    uploadFileUseCase = new UploadFileUseCase(userRepository);
  });

  it('should upload file successfully', async () => {
    const request: Request = {
      body: {
        email: 'test@example.com',
      },
      file: {
        originalname: 'test.jpg',
        size: 1024,
        filename: 'test123.jpg',
        path: '/path/to/test123.jpg',
      },
    } as Request;

    const userData = { id: 'user-id' };
    userRepository.findByEmail = vi.fn().mockResolvedValue(userData);
    userRepository.upload = vi.fn();

    await uploadFileUseCase.execute(request);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.upload).toHaveBeenCalledWith({
      name: 'test.jpg',
      size: 1024,
      key: 'test123.jpg',
      path: '/path/to/test123.jpg',
      updatedAt: expect.any(Date),
      userId: 'user-id',
    });
  });

  it('Should throw an error if user not found', async () => {
    const request: Request = {
      body: { email: 'test@example.com' },
    } as Request;

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    expect(uploadFileUseCase.execute(request)).rejects.toThrowError('User not found');
  });

  it('Should throw an error if file is not provided', async () => {
    const request: Request = {
      body: {
        email: 'test@example.com',
      },
    } as Request;

    const userData = { id: 'user-id' };
    userRepository.findByEmail = vi.fn().mockResolvedValue(userData);

    await expect(uploadFileUseCase.execute(request)).rejects.toThrowError('File is required');

  });
});

