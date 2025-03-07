export interface HttpService {
  get<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
  getConcurrent<T>(
    requests: { endpoint: string; params?: Record<string, string> }[]
  ): Promise<T[]>;
}

export class HttpClientService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async fetchData(endpoint: string, params?: Record<string, string>) {
    return await this.httpService.get(endpoint, params);
  }

  async fetchDataConcurrent(
    requests: { endpoint: string; params?: Record<string, string> }[]
  ) {
    return await this.httpService.getConcurrent(requests);
  }
}
