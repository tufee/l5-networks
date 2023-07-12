import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../helper/uploadFile';
import {
  validateCreateUserData,
  validateUser,
} from '../middlewares/validate-user-middleware';
import { userController } from './user-factory';

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

userRouter.get('/download', (request: Request, response: Response) => {
  userController.download(request, response);
});

export { userRouter };
