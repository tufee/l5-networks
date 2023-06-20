import { Request, Response, Router } from 'express';
import { validateCreateUserData } from '../middlewares/validate-user-middleware';
import { userController } from './user-factory';

const userRouter = Router();

userRouter.post('/createUser', validateCreateUserData, (request: Request, response: Response) => {
  userController.createUser(request, response);
});


export { userRouter };
