import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
import { Encrypter } from '../../infra/helper/encrypter';
import { ICreateUserData, IUserResponse } from './create-user-dto';

export class CreateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) { }

  async execute(data: ICreateUserData): Promise<IUserResponse> {

    const isUserAlreadyRegistered = await this.userPostgresRepository.findByEmail(data.email);

    if (isUserAlreadyRegistered) {
      throw new Error('User already registered');
    }

    const hashedPassword = await this.encrypter.encrypt(data.password);

    data.password = hashedPassword;

    const user = await this.userPostgresRepository.save(data);

    return user;
  }

}
