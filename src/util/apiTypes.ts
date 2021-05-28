import { Method } from 'axios';

export enum ApiState {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  FAILED = 'FAILED',
}

export interface IAPIState {
  status: ApiState;
  error?: string;
}

type Endpoint = {
  url: string;
  method: Method;
};

export interface APIErrorType {
  error: string;
  message: string;
  statusCode: number;
}

export type IEndpoints = Record<string, Endpoint>;
