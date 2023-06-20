import { Request, Response, Router } from 'express';
import { validateCreateUserData, validateQueryParamsUserEmail, validateUserEmail } from '../middlewares/validate-user-middleware';
import { userController } from './user-factory';

const userRouter = Router();

userRouter.post('/createUser', validateCreateUserData, (request: Request, response: Response) => {
  userController.createUser(request, response);
});

userRouter.post('/deleteUser', validateUserEmail, (request: Request, response: Response) => {
  userController.deleteUser(request, response);
});

userRouter.get('/findUser', validateQueryParamsUserEmail, (request: Request, response: Response) => {
  userController.findUser(request, response);
});


export { userRouter };
