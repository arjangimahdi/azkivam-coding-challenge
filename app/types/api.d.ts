export interface ApiConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

export type HttpMethod = 'GET' | 'POST'

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  query?: Record<string, any>
  timeout?: number
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
}

export interface ApiClient {
  request: <T = any>(
    url: string,
    options?: RequestOptions
  ) => Promise<ApiResponse<T>>
  get: <T = any>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => Promise<ApiResponse<T>>
  post: <T = any>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'method'>
  ) => Promise<ApiResponse<T>>
}
