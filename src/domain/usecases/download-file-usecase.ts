import { Request } from 'express';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';

interface DownloadFile {
  path: string
}

export class DownloadFileUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository
  ) { }

  async execute(request: Request): Promise<DownloadFile> {

    const key = request.body.key;

    if (!key) {
      throw new Error('Key is required');
    }

    return await this.userPostgresRepository.download(key);
  }
}
