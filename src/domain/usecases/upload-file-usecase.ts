import { Request } from 'express';
import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import * as validator from '../../infra/helper/validator';

export class UploadFileUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository
  ) { }

  async execute(request: Request): Promise<void> {

    validator.validateEmail(request.body.email);

    const userData = await this.userPostgresRepository.findByEmail(request.body.email);

    if (!userData) {
      throw new Error('User not found');
    }

    if (!request.file) {
      throw new Error('File is required');
    }

    const uploadData = {
      name: request.file.originalname,
      size: request.file.size,
      key: request.file.filename,
      path: request.file.path,
      updatedAt: new Date(),
      userId: userData.id,
    };

    await this.userPostgresRepository.upload(uploadData);
  }
}
