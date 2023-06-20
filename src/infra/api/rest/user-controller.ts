import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../domain/usecases/create-user-usecase';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
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


}
