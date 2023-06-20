import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';
import { DeleteUserUseCase } from '../../../domain/usecases/delete-user-usecase';
import { FindUserUseCase } from '../../../domain/usecases/find-user-usecase';
import { Encrypter } from '../../helper/encrypter';
import { UserRepository } from '../repositories/prisma/user-repository';
import { UserController } from './user-controller';

export const userRepository = new UserRepository();
const encrypter = new Encrypter();

const createUserUseCase = new CreateUserUseCase(userRepository, encrypter);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);

const userController = new UserController(createUserUseCase, deleteUserUseCase, findUserUseCase, );

export { userController };
