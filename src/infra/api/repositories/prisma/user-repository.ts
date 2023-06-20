import { ICreateUserData, IUserResponse, IUserUpload } from '../../../../domain/usecases/create-user-dto';
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

  async upload(data: IUserUpload): Promise<void> {
    await prisma.upload.create({
      data: {
        name: data.name,
        size: data.size,
        key: data.key,
        path: data.path,
        updatedAt: data.updatedAt,
        userId: data.userId
      }
    });
  }

  async download(email: string): Promise<any> {
    await prisma.user.findUnique({
      where: {
        email: email
      },
      include: {
        uploads: true
      }
    });
  }
}
