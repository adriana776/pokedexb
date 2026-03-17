import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('Error en la petición HTTP, revise los logs.');
    }
  }
}
