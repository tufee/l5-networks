import {FindGitHubUserUseCase} from './find-github-user-usecase';
import {describe, expect, it, vi} from 'vitest';

describe('FindGitHubUserUseCase', () => {
  it('should return the GitHub user when found', async () => {
    const axiosRequestMock = {
      request: vi.fn().mockResolvedValue({
        id: '1234',
        name: 'John Doe',
        login: 'johndoe',
        email: 'johndoe@example.com',
        url: 'https://github.com/johndoe',
        location: 'New York'
      })
    };

    const useCase = new FindGitHubUserUseCase(axiosRequestMock as any);

    const result = await useCase.execute('johndoe');

    expect(result).toEqual({
      id: '1234',
      name: 'John Doe',
      login: 'johndoe',
      email: 'johndoe@example.com',
      url: 'https://github.com/johndoe',
      location: 'New York'
    });
    expect(axiosRequestMock.request).toHaveBeenCalledWith(
      'https://api.github.com/users/johndoe',
      'GET'
    );
  });

  it('should throw an error when GitHub user is not found', async () => {
    const axiosRequestMock = {
      request: vi.fn().mockResolvedValue(null)
    };

    const useCase = new FindGitHubUserUseCase(axiosRequestMock as any);

    const executePromise = useCase.execute('nonexistentuser');

    await expect(executePromise).rejects.toThrow('User not found');
    expect(axiosRequestMock.request).toHaveBeenCalledWith(
      'https://api.github.com/users/nonexistentuser',
      'GET'
    );
  });
});