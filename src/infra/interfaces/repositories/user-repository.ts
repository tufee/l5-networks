import { ICreateUserData, IUserResponse, IUserUpload } from '../../../domain/usecases/create-user-dto';

export interface IUserRepository {
  save(user: ICreateUserData): Promise<IUserResponse>;
  findByEmail(email: string): Promise<IUserResponse | null>;
  delete(email: string): Promise<void>;
  upload(data: IUserUpload): Promise<void>;
  download(email: string): Promise<any>;
}
