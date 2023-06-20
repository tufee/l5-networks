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


