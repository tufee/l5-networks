export interface ICreateUserData {
  name: string;
  login: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  login: string;
  email: string;
}

export interface IUserUpload {
  name: string;
  size: number;
  key: string;
  path: string;
  updatedAt: Date;
  userId: string;
}
