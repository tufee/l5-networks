import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../helper/uploadFile';
import {
  validateCreateUserData,
  validateUser,
} from '../middlewares/validate-user-middleware';
import { userController, userRepository } from './user-factory';

const userRouter = Router();

userRouter.post('/createUser', validateCreateUserData, (request: Request, response: Response) => {
  userController.createUser(request, response);
});

userRouter.post('/deleteUser', (request: Request, response: Response) => {
  userController.deleteUser(request, response);
});

userRouter.get('/findUser', (request: Request, response: Response) => {
  userController.findUser(request, response);
});

userRouter.get('/findGitHubUser', validateUser, (request: Request, response: Response) => {
  userController.findGitHubUser(request, response);
});

userRouter.post('/upload', multer(multerConfig).single('file'), (request: Request, response: Response) => {
  userController.upload(request, response);
});

userRouter.get('/download', async (request: Request, response: Response): Promise<any> => {

  console.log(request.body);
  const userData = await userRepository.findByEmail(request.body.email);
  console.log(userData);

  if (!userData) {
    return response.status(400).json({ error: 'User not found' });
  }

  const file = await userRepository.download(userData.email);

  console.log(file);
  response.download(file.toString());
});

export { userRouter };
