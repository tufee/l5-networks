import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';

export class DeleteUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
  ) { }

  async execute(email: string): Promise<void> {

    const isUser = await this.userPostgresRepository.findByEmail(email);

    if (!isUser) {
      throw new Error('User not found');
    }

    await this.userPostgresRepository.delete(email);
  }

}
