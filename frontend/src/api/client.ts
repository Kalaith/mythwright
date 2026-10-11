import {
  ApiError as SharedApiError,
  buildApiUrl,
  createApiClient,
  resolveApiRootUrl,
} from '@webhatchery/api-client';
import { requiredEnv } from '../config/env';

export class ApiResponse<T = unknown> {
  success: boolean = false;
  data?: T;
  error?: string;
  message?: string;
  status?: string;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  success?: boolean;
  [key: string]: unknown;
}

export class ApiError extends Error {
  public status: number;
  public response?: ErrorResponse;

  constructor(message: string, status: number = 500, response?: ErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

type TokenProvider = () => string | null | Promise<string | null>;

const baseUrl = requiredEnv('VITE_API_BASE_URL');
const version = requiredEnv('VITE_API_VERSION');
const sharedClient = createApiClient({
  baseURL: resolveApiRootUrl(baseUrl, version),
  preserveEnvelope: true,
  tokenProvider: async () => null,
});

let tokenProvider: TokenProvider | null = null;

export function setTokenProvider(provider: TokenProvider | null): void {
  tokenProvider = provider;
  sharedClient.setTokenProvider(async () => {
    if (!tokenProvider) {
      return null;
    }

    try {
      return await tokenProvider();
    } catch {
      return null;
    }
  });
}

export { buildApiUrl, resolveApiRootUrl };

function toLocalApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof SharedApiError) {
    return new ApiError(error.message, error.status, isErrorResponse(error.payload) ? error.payload : undefined);
  }

  return new ApiError(error instanceof Error ? error.message : 'Network error', 0);
}

function isErrorResponse(value: unknown): value is ErrorResponse {
  return typeof value === 'object' && value !== null;
}

class ApiClient {
  private async send<T = unknown>(endpoint: string, method: string, body?: unknown): Promise<T> {
    try {
      return await sharedClient.request<T>(endpoint, {
        method,
        body,
      });
    } catch (error) {
      throw toLocalApiError(error);
    }
  }

  async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    return this.send<ApiResponse<T>>(endpoint, 'GET');
  }

  async post<T = unknown>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.send<ApiResponse<T>>(endpoint, 'POST', data);
  }

  async rawGet<T = unknown>(endpoint: string): Promise<T> {
    return this.send<T>(endpoint, 'GET');
  }

  async rawPost<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return this.send<T>(endpoint, 'POST', data);
  }

  async put<T = unknown>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.send<ApiResponse<T>>(endpoint, 'PUT', data);
  }

  async delete<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    return this.send<ApiResponse<T>>(endpoint, 'DELETE');
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.get('/health');
      return response.status === 'healthy' || response.success === true;
    } catch {
      return false;
    }
  }
}

const apiClient = new ApiClient();

export default apiClient;
export { apiClient };
