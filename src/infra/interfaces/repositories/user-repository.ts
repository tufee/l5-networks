import { ICreateUserData, IUserResponse } from '../../../domain/usecases/create-user-dto';

export interface IUserRepository {
  save(user: ICreateUserData): Promise<IUserResponse>;
  findByEmail(email: string): Promise<IUserResponse | null>;
}
