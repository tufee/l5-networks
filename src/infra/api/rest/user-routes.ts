import { Request, Response, Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../helper/uploadFile';
import { validateCreateUserData, validateGitHubUser, validateQueryParamsUserEmail } from '../middlewares/validate-user-middleware';
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

userRouter.get('/findGitHubUser', validateGitHubUser, (request: Request, response: Response) => {
  userController.findGitHubUser(request, response);
});

userRouter.post('/upload', multer(multerConfig).single('file'), async (request: Request, response: Response): Promise<any> => {

  if (!request.file) {
    return response.status(400).json({ error: 'File is required' });
  }

  const userData = await userRepository.findByEmail(request.body.email);

  if (!userData) {
    return response.status(400).json({ error: 'User not found' });
  }

  const uploadData = {
    name: request.file.originalname,
    size: request.file.size,
    key: request.file.filename,
    path: request.file.path,
    updatedAt: new Date(),
    userId: userData.id,
  };

  await userRepository.upload(uploadData);

  response.json({ message: 'File uploaded successfully' });
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
