import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import * as validator from '../../infra/helper/validator';
import { IUserResponse } from './create-user-dto';

export class FindUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
  ) { }

  async execute(email: string): Promise<IUserResponse> {

    validator.validateEmail(email);

    const user = await this.userPostgresRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

}
