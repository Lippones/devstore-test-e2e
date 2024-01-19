import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseURL = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'

  const url = new URL(apiPrefix.concat(path), baseURL)

  return fetch(url, init)
}
