import { describe, expect, it } from 'vitest';
import * as validator from './validator';

describe('Validator', () => {

  describe('Validate name', () => {
    it('should return an error if dont receive a name', () => {
      expect(() => validator.validateName('')).toThrowError('Name is required');
    });

    it('should return an error when name length is greater than 100', () => {
      expect(() => validator.validateName('a'.repeat(101))).toThrowError('Maximum name length is 100');
    });

    it('should return true when name is valid', () => {
      expect(validator.validateName('John Doe')).toBe(true);
    });
  });

  describe('Validate login', () => {
    it('should return an error if dont receive a login', () => {
      expect(() => validator.validateLogin('')).toThrowError('Login is required');
    });

    it('should return an error when login length is greater than 50', () => {
      expect(() => validator.validateLogin('a'.repeat(51))).toThrowError('Maximum login length is 50');
    });

    it('should return true when login is valid', () => {
      expect(validator.validateLogin('John')).toBe(true);
    });
  });

  describe('Validate email', () => {
    it('should return an error if dont receive a email', () => {
      expect(() => validator.validateEmail('')).toThrowError('Email is required');
    });

    it('should return false if the email is not valid', () => {
      expect(validator.validateEmail('john@xx@dd@.com')).toBe(false);
    });

    it('should return true if the email is valid', () => {
      expect(validator.validateEmail('john@email.com')).toBe(true);
    });
  });

  describe('Validate email confirmation', () => {
    it('should return an error if email confirmation does not match', () => {
      expect(() => validator.validateEmailConfirmation('john@mail.com', 'john_test@mail.com')).toThrowError('Email confirmation does not match');
    });

    it('should return true if the email confirmation match', () => {
      expect(validator.validateEmailConfirmation('john@mail.com', 'john@mail.com')).toBe(true);
    });
  });

  describe('Validate password', () => {
    it('should return an error if dont receive a password', () => {
      expect(() => validator.validatePassword('')).toThrowError('Password is required');
    });

    it('should return an error if the password length is greater than 50', () => {
      expect(() => validator.validatePassword('x'.repeat(51))).toThrowError('Maximum password length is 50');
    });

    it('should return an error if the password length is less than 8', () => {
      expect(() => validator.validatePassword('xx')).toThrowError('Minimum password length is 8');
    });

    it('should return true if the password is valid', () => {
      expect(validator.validatePassword('12345678')).toBe(true);
    });
  });

  describe('Validate passoword confirmation', () => {
    it('should return an error if passowrd confirmation does not match', () => {
      expect(() => validator.validatePasswordConfirmation('12345678', '123456789')).toThrowError('Password confirmation does not match');
    });

    it('should return true if the passoword confirmation match', () => {
      expect(validator.validatePasswordConfirmation('12345678', '12345678')).toBe(true);
    });
  });

});
