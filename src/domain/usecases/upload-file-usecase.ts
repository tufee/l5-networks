// import { UserRepository } from '../../infra/api/repositories/prisma/user-repository';
// //import { uploadFile } from '../../infra/helper/uploadFile';
// import { IUserResponse } from './create-user-dto';
// import { Request, Response } from 'express';

// export class UploadFileUseCase {
//   constructor(
//     private readonly userPostgresRepository: UserRepository,
//   ) { }

//   async execute(request: Request, response: Response): Promise<any> {

//     const path = await uploadFile(request, response);

//     await this.userPostgresRepository.upload(path);

//     return;
//   }

// }
