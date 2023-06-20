import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';
import { DeleteUserUseCase } from '../../../domain/usecases/delete-user-usecase';
import { FindGitHubUserUseCase } from '../../../domain/usecases/find-github-user-usecase';
import { FindUserUseCase } from '../../../domain/usecases/find-user-usecase';
import { AxiosRequest } from '../../helper/axiosRequest';
import { Encrypter } from '../../helper/encrypter';
import { UserRepository } from '../repositories/prisma/user-repository';
import { UserController } from './user-controller';

export const userRepository = new UserRepository();
const encrypter = new Encrypter();
const axiosRequest = new AxiosRequest();

const createUserUseCase = new CreateUserUseCase(userRepository, encrypter);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const findGitHubUser = new FindGitHubUserUseCase(axiosRequest);

const userController = new UserController(createUserUseCase, deleteUserUseCase, findUserUseCase, findGitHubUser);

export { userController };
