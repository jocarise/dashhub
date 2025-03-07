import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HttpService } from './httpService';

export class AxiosHttpService implements HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string = '') {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: this.getHeaders(),
    });
  }

  async get<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        endpoint,
        { params }
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getConcurrent<T>(
    requests: { endpoint: string; params?: Record<string, string> }[]
  ): Promise<T[]> {
    try {
      const axiosRequests = requests.map(({ endpoint, params }) =>
        this.axiosInstance.get(endpoint, { params })
      );

      const responses = await axios.all(axiosRequests);

      return responses.map((response) => response.data);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error', error.message);
      }
    } else {
      console.error('Unknown error:', error);
    }
  }
}
