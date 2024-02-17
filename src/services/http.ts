import { StorageKey } from '@/constants/storage';
import axios, { isAxiosError, isCancel, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

const getAuthorization = () => localStorage.getItem(StorageKey.Token);

const getHeaders = () => ({
  Authorization: getAuthorization(),
});

class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  public async get<T>(url: string, params?: Record<string, unknown>, opt?: AxiosRequestConfig) {
    const { data } = await this.client.get<T>(url, {
      ...opt,
      params,
      headers: {
        ...opt?.headers,
        ...getHeaders()
      },
    });

    return data;
  }

  public async post<T>(url: string, body?: Record<string, unknown>, opt?: AxiosRequestConfig) {
    const { data } = await this.client.post<T>(url, body, {
      ...opt,
      headers: {
        ...opt?.headers,
        ...getHeaders()
      },
    });

    return data;
  }

  public async put<T>(url: string, body?: Record<string, unknown>, opt?: AxiosRequestConfig) {
    const { data } = await this.client.put<T>(url, body, {
      ...opt,
      headers: {
        ...opt?.headers,
        ...getHeaders()
      },
    });

    return data;
  }

  public async patch<T>(url: string, body?: Record<string, unknown>, opt?: AxiosRequestConfig) {
    const { data } = await this.client.patch<T>(url, body, {
      ...opt,
      headers: {
        ...opt?.headers,
        ...getHeaders()
      },
    });

    return data;
  }

  public async delete<T>(url: string, params?: Record<string, unknown>, opt?: AxiosRequestConfig) {
    const { data } = await this.client.delete<T>(url, {
      params,
      headers: {
        ...opt?.headers,
        ...getHeaders()
      },
    });

    this.client.interceptors.request

    return data;
  }

  public isHttpError = isAxiosError;

  public isHttpAbort = isCancel;

  public handleTokenExpire(callback: (error: AxiosError) => Promise<boolean>) {
    const interceptor = this.client.interceptors.response.use(
      (res) => res,
      async (error) => {
        try {
          if (
            error instanceof AxiosError &&
            error.response?.status === 401 &&
            error.config &&
            !error.config.headers.Retry
          ) {
            const result = await callback(error);

            if (result) {
              try {
                error.config.headers.Retry = true;
                error.config.headers.Authorization = getAuthorization();

                return this.client.request(error.config!);
              } catch (err) {/* */}
            }
          }
        } catch (err) {/* */}

        return Promise.reject(error);
      },
    );

    return () => {
      this.client.interceptors.response.eject(interceptor);
    };
  }
}

export const http = new HttpClient(`${location.origin}/.netlify/functions`);
export const httpRender = new HttpClient(import.meta.env.VITE_SERVER);
