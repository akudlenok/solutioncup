import { TOKEN_KEY } from 'constants/global';

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function deleteAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
