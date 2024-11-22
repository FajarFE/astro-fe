export type FetchResponse<T> = {
  data: T | null;
  error: string | null;
};

export const apiClient = {
  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    headers?: Record<string, string>,
    contentType:
      | 'application/json'
      | 'application/x-www-form-urlencoded'
      | 'multipart/form-data' = 'application/json'
  ): Promise<FetchResponse<T>> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': contentType,
          ...headers,
        },
        body: body
          ? contentType === 'application/json'
            ? JSON.stringify(body)
            : body
          : undefined,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as T;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || 'Unknown error occurred' };
    }
  },

  async get<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>('GET', url, undefined, headers);
  },

  async post<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
    contentType:
      | 'application/json'
      | 'application/x-www-form-urlencoded'
      | 'multipart/form-data' = 'application/json'
  ) {
    return this.request<T>('POST', url, body, headers, contentType);
  },

  async put<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
    contentType:
      | 'application/json'
      | 'application/x-www-form-urlencoded'
      | 'multipart/form-data' = 'application/json'
  ) {
    return this.request<T>('PUT', url, body, headers, contentType);
  },

  async delete<T>(url: string, headers?: Record<string, string>) {
    return this.request<T>('DELETE', url, undefined, headers);
  },
};
