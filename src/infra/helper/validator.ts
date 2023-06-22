// import { IGitHubUser } from "../../domain/usecases/find-github-user-usecase";

export const validateName = (name: string): boolean | Error => {
  if (!name) {
    throw new Error('Name is required');
  }

  if (name.length > 100) {
    throw new Error('Maximum name length is 100');
  }

  return true;
};

export const validateLogin = (login: string): boolean | Error => {
  if (!login) {
    throw new Error('Login is required');
  }

  if (login.length > 50) {
    throw new Error('Maximum login length is 50');
  }

  return true;
};

export const validateEmail = (email: string): boolean | Error => {
  if (!email) {
    throw new Error('Email is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error('Email is invalid');
  }

  return true;
};

export const validateEmailConfirmation = (email: string, emailConfirmation: string): boolean | Error => {
  if (email !== emailConfirmation) {
    throw new Error('Email confirmation does not match');
  }

  return true;
};

export const validatePassword = (password: string): boolean | Error => {
  if (!password) {
    throw new Error('Password is required');
  }

  if (password.length > 50) {
    throw new Error('Maximum password length is 50');
  }

  if (password.length < 8) {
    throw new Error('Minimum password length is 8');
  }

  return true;
};

export const validatePasswordConfirmation = (password: string, passwordConfirmation: string): boolean | Error => {
  if (password !== passwordConfirmation) {
    throw new Error('Password confirmation does not match');
  }

  return true;
};

export const validateGitHubUser = (user: string): boolean | Error => {
  if (!user) {
    throw new Error('User is required');
  }

  return true;
};
