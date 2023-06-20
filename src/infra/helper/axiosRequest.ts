import axios from 'axios';
import { logger } from './logger';

export class AxiosRequest {

  async request(url: string, method: string, data?: any) {
    const response = await axios({
      method,
      url,
      data
    });
    return response.data;
  }

  async uploadFile(file: File): Promise<string> {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.url;
    } catch (error) {
      logger.warn(error);
      throw new Error('Failed to upload file.');
    }
  }

}
