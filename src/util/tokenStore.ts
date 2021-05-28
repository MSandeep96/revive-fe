export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem('refresh_token', token);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};
