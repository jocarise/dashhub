export class FetchHttpService {
  // implements HttpService
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    endpoint: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  // async getConcurrent<T>(
  //   requests: { endpoint: string; params?: Record<string, string> }[]
  // ): Promise<T[]> {}

  private buildUrl(
    endpoint: string,
    params: Record<string, string> = {}
  ): string {
    const url = new URL(endpoint, this.baseUrl);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return url.toString();
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  }
}
