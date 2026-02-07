import { toast } from 'sonner';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

const BASE_URL = '/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'X-Tenant-Id': '1', // Default tenant ID
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;
    
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const config: RequestInit = {
      ...customConfig,
      headers: {
        ...this.getHeaders(),
        ...headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Use text() first to safely handle empty responses or non-JSON errors
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn('Response is not JSON:', text);
        // If parsing fails, treat body as error message if status is error
        // or just return empty object if status is ok (though unlikely for REST API)
        data = { message: text || response.statusText };
      }

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('adminUser');
          window.location.href = '/login';
          throw new Error('会话已过期，请重新登录');
        }
        
        const errorMessage = (data && data.message) || '请求失败';
        throw new Error(errorMessage);
      }

      return data as T;
    } catch (error) {
      const message = error instanceof Error ? error.message : '网络错误';
      toast.error(message);
      throw error;
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
