import type {
  ApiConfig,
  RequestOptions,
  ApiResponse,
  ApiClient,
} from '~/types/api'

export const useApi = (config: ApiConfig = {}): ApiClient => {
  const runtimeConfig = useRuntimeConfig()

  const {
    baseURL = runtimeConfig.public.apiBaseUrl,
    timeout = parseInt(runtimeConfig.public.apiTimeout),
    headers: defaultHeaders = {},
  } = config

  const request = async <T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> => {
    const {
      method = 'GET',
      headers = {},
      body,
      query,
      timeout: requestTimeout = timeout,
    } = options

    try {
      const response = await $fetch<T>(url, {
        baseURL,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
          ...headers,
        },
        body,
        query,
        timeout: requestTimeout,
      })

      return {
        data: response,
        status: 200,
        statusText: 'OK',
      }
    } catch (error: any) {
      throw new Error(`failed: ${error.message || 'Unknown error'}`)
    }
  }

  const get = <T = any>(
    url: string,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ) => {
    return request<T>(url, { ...options, method: 'GET' })
  }

  const post = <T = any>(
    url: string,
    body?: any,
    options: Omit<RequestOptions, 'method'> = {}
  ) => {
    return request<T>(url, { ...options, method: 'POST', body })
  }

  return {
    request,
    get,
    post,
  }
}
