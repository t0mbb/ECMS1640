import { httpClient } from '../utils/HttpClient';

export async function login(username: string, passwords: string) {
  const data = await httpClient.post('/auth/login', { email: username, password: passwords });
  return data
}
export async function logout() {
  
}