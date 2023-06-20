import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';
import { Encrypter } from '../../helper/encrypter';
import { UserRepository } from '../repositories/prisma/user-repository';
import { UserController } from './user-controller';

export const userRepository = new UserRepository();
const encrypter = new Encrypter();

const createUserUseCase = new CreateUserUseCase(userRepository, encrypter);
const userController = new UserController(createUserUseCase);

export { userController };
