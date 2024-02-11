import { StorageKey } from "@/constants/storage";

export const parseToken = (token: string) => {
  const base64Url = token.split('.')[1];

  if (!base64Url) {
    return null;
  }

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = window.atob(base64)
    .split('')
    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
    .join('');

  try {
    return JSON.parse(window.decodeURIComponent(payload));
  } catch (err) {
    return null;
  }
}

export function getRoleFromToken(token?: string | null) {
  const accessToken = token ?? localStorage.getItem(StorageKey.Token);

  if (!accessToken) {
    return '';
  }

  const parsed = parseToken(accessToken);

  if (!parsed || typeof parsed === 'string') {
    return '';
  }

  return parsed.role;
}
