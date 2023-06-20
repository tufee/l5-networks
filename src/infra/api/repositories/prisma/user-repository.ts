import { ICreateUserData, IUserResponse } from '../../../../domain/usecases/create-user-dto';
import { IUserRepository } from '../../../interfaces/repositories/user-repository';
import { prisma } from './prisma-client';

export class UserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<IUserResponse | null> {
    return await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        login: true,
        email: true,
      }
    });
  }

  async save(user: ICreateUserData): Promise<IUserResponse> {
    return await prisma.user.create({
      data: {
        name: user.name,
        login: user.email,
        email: user.email,
        password: user.password
      }
    });
  }

  async delete(email: string): Promise<void> {
    await prisma.user.delete({
      where: {
        email
      }
    });
  }

}
