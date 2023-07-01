import {UserRepository} from '../../infra/api/repositories/prisma/user-repository';
import {Encrypter} from '../../infra/helper/encrypter';
import {ICreateUserData, IUserResponse} from './create-user-dto';

export class CreateUserUseCase {
  constructor(
    private readonly userPostgresRepository: UserRepository,
    private readonly encrypt: Encrypter
  ) { }

  async execute(data: ICreateUserData): Promise<IUserResponse> {

    const isUserAlreadyRegistered = await this.userPostgresRepository.findByEmail(data.email);

    if (isUserAlreadyRegistered) {
      throw new Error('User already registered');
    }

    data.password = await this.encrypt.encrypt(data.password);

    return await this.userPostgresRepository.save(data);
  }

}
