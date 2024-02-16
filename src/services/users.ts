import { API } from '@/constants/api';
import { http } from './http';
import { StorageKey } from '@/constants/storage';

export async function login(params: { username: string, password: string }) {
  const response = await http.get<{ accessToken: string; refreshToken: string }>(API.Users, params);

  return response;
}

export async function getProfile(ctrl?: AbortController) {
  const response = await http.get<{ username: string }>(API.Profile, undefined, {
    signal: ctrl?.signal,
  });

  return response;
}

export async function renewToken() {
  const response = await http.post<{ accessToken: string; refreshToken: string }>(API.RefreshToken, {
    refreshToken: localStorage.getItem(StorageKey.RefreshToken),
  });

  return response;
}
