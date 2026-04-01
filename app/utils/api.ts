import type { AxiosInstance } from 'axios'

export interface ApiFieldError {
  field: string
  message: string
}

export interface ApiErrorResponse {
  statusCode: number
  message: string
  errors?: ApiFieldError[]
}

let _instance: AxiosInstance

export function setApiInstance(instance: AxiosInstance) {
  _instance = instance
}

export function api(): AxiosInstance {
  return _instance
}
