import { Request } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { DownloadFileUseCase } from './download-file-usecase';

describe('DownloadFileUseCase', () => {
  let userRepository: UserRepository;
  let downloadFileUseCase: DownloadFileUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    downloadFileUseCase = new DownloadFileUseCase(userRepository);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should throw an error if key is not provided', async () => {
    const request: Request = {
      body: {},
    } as Request;

    await expect(downloadFileUseCase.execute(request)).rejects.toThrowError('Key is required');
  });

  it('should call the userPostgresRepository.download method with the provided key', async () => {
    const key = 'file-1689161707452-235005779.jpg';
    const request: Request = {
      body: { key },
    } as Request;

    const downloadSpy = vi.spyOn(userRepository, 'download').mockResolvedValue({ path: '/path/to/file' });

    await downloadFileUseCase.execute(request);

    expect(downloadSpy).toHaveBeenCalledWith(key);
  });

  it('should return the downloaded file path', async () => {
    const key = 'file-1689161707452-235005779.jpg';
    const request: Request = {
      body: { key },
    } as Request;

    vi.spyOn(userRepository, 'download').mockResolvedValue({ path: '/path/to/file' });

    const result = await downloadFileUseCase.execute(request);

    expect(result).toEqual({ path: '/path/to/file' });
  });
});
