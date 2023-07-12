import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';
import { DeleteUserUseCase } from '../../../domain/usecases/delete-user-usecase';
import { FindGitHubUserUseCase } from '../../../domain/usecases/find-github-user-usecase';
import { FindUserUseCase } from '../../../domain/usecases/find-user-usecase';
import { UploadFileUseCase } from '../../../domain/usecases/upload-file-usecase';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findGitHubUserUseCase: FindGitHubUserUseCase,
    private readonly uploadFileUseCase: UploadFileUseCase,
  ) { }

  async createUser(request: Request, response: Response) {

    try {
      const data = request.body;
      const user = await this.createUserUseCase.execute(data);

      return response.json(user);
    } catch (error: any) {
      console.log(error);
      return response.status(400).json({ message: error.message });
    }
  }

  async deleteUser(request: Request, response: Response) {

    try {
      const email = request.body.email;

      await this.deleteUserUseCase.execute(email);

      return response.json();
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findUser(request: Request, response: Response) {

    try {
      const email = request.query.email as string;

      const user = await this.findUserUseCase.execute(email);

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findGitHubUser(request: Request, response: Response) {

    try {
      const user = request.query.user as string;

      const gitHubUser = await this.findGitHubUserUseCase.execute(user);

      return response.json(gitHubUser);
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }

  async upload(request: Request, response: Response) {

    try {
      await this.uploadFileUseCase.execute(request);

      response.json({ message: 'File uploaded successfully' });
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }
}
