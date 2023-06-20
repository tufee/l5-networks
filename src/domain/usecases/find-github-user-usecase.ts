import { AxiosRequest } from '../../infra/helper/axiosRequest';

export interface IGitHubUser {
  id: string;
  name: string;
  login: string;
  email: string;
  url: string;
  location: string;
}

export class FindGitHubUserUseCase {
  constructor(private readonly axiosRequest: AxiosRequest) { }

  async execute(user: string): Promise<IGitHubUser> {

    const gitHubUser = await this.axiosRequest.request(`https://api.github.com/users/${user}`, 'GET');

    if (!gitHubUser) {
      throw new Error('User not found');
    }

    const { id, name, login, email, url, location } = gitHubUser;

    const userData = {
      id,
      name,
      login,
      email,
      url,
      location
    };

    return userData;
  }

}
