import { NextFunction, Request, Response } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as validator from '../../helper/validator';
import {
  validateCreateUserData,
  validateUser
} from './validate-user-middleware';

describe('validateUserMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        name: 'John Doe',
        login: 'johndoe',
        email: 'johndoe@example.com',
        emailConfirmation: 'johndoe@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      },
      query: {
        user: 'john.doe@example.com',
      }
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNextFunction = vi.fn() as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('validateCreateUserData', () => {
    it('should call the next function if all validations pass', () => {
      validateCreateUserData(
        mockRequest as Request, mockResponse as Response, mockNextFunction
      );
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
    });

    it('should call validator functions with the correct arguments', () => {
      const validateNameMock = vi.spyOn(validator, 'validateName');
      const validateLoginMock = vi.spyOn(validator, 'validateLogin');
      const validateEmailMock = vi.spyOn(validator, 'validateEmail');
      const validateEmailConfirmationMock = vi.spyOn(
        validator, 'validateEmailConfirmation'
      );
      const validatePasswordMock = vi.spyOn(validator, 'validatePassword');
      const validatePasswordConfirmationMock = vi.spyOn(
        validator, 'validatePasswordConfirmation'
      );

      validateCreateUserData(
        mockRequest as Request, mockResponse as Response, mockNextFunction
      );

      expect(validateNameMock).toHaveBeenCalledWith(mockRequest.body.name);
      expect(validateLoginMock).toHaveBeenCalledWith(mockRequest.body.login);
      expect(validateEmailMock).toHaveBeenCalledWith(mockRequest.body.email);
      expect(validateEmailConfirmationMock).toHaveBeenCalledWith(
        mockRequest.body.email,
        mockRequest.body.emailConfirmation
      );
      expect(validatePasswordMock).toHaveBeenCalledWith(
        mockRequest.body.password);
      expect(validatePasswordConfirmationMock).toHaveBeenCalledWith(
        mockRequest.body.password,
        mockRequest.body.passwordConfirmation
      );
    });

    it('should return a 400 status code and error message if a validation fails',
      () => {
        const errorMessage = 'Name is required';
        vi.spyOn(validator, 'validateName').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        validateCreateUserData(
          mockRequest as Request, mockResponse as Response, mockNextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
  });

  describe('validateUser', () => {
    it('should call the next function if validation passes', () => {
      validateUser(
        mockRequest as Request, mockResponse as Response, mockNextFunction);
      expect(mockNextFunction).toHaveBeenCalledTimes(1);
    });

    it('should call the validator function with the correct argument', () => {
      const validateUserMock = vi.spyOn(validator, 'validateUser');

      validateUser(
        mockRequest as Request, mockResponse as Response, mockNextFunction
      );

      expect(validateUserMock).toHaveBeenCalledWith(mockRequest.query?.user);
    });

    it('should return a 400 status code and error message if the validation fails',
      () => {
        const errorMessage = 'User is required';
        vi.spyOn(validator, 'validateUser').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        validateUser(
          mockRequest as Request, mockResponse as Response, mockNextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
      });
  });

});
