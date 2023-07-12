import { NextFunction, Request, Response } from 'express';
import * as validator from '../../helper/validator';

export const validateCreateUserData = (request: Request, response: Response, next: NextFunction) => {
  const { name, login, email, emailConfirmation, password, passwordConfirmation } = request.body;

  try {
    validator.validateName(name);
    validator.validateLogin(login);
    validator.validateEmail(email);
    validator.validateEmailConfirmation(email, emailConfirmation);
    validator.validatePassword(password);
    validator.validatePasswordConfirmation(password, passwordConfirmation);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }

  next();
};

export const validateQueryParamsUserEmail = (request: Request, response: Response, next: NextFunction) => {
  const email = request.query.email as string;

  try {
    validator.validateEmail(email);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }

  next();
};

export const validateUser = (request: Request, response: Response, next: NextFunction) => {
  const user = request.query.user as string;

  try {
    validator.validateUser(user);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }

  next();
};
