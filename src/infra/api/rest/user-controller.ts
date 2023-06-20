import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';
import { FindUserUseCase } from '../../../domain/usecases/find-user-usecase';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) { }

  async createUser(request: Request, response: Response) {

    try {
      const data = request.body;

      const user = await this.createUserUseCase.execute(data);

      return response.json(user);
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




}
