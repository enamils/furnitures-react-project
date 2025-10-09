import type { UserData } from "../types/userDataType.ts";

const API_URL = import.meta.env.VITE_FURNITURES_URL;

export const calculateExpirationDate = (expirationTime = 3600000) => {
    return new Date(new Date().getTime() + expirationTime);
};

export const fetchStoredAuth = (): UserData | null => {
    try {
        const storedData = localStorage.getItem('userData');
        if (!storedData) return null;

        const userData: UserData = JSON.parse(storedData);
        if (new Date(userData.expiration) <= new Date()) {
            localStorage.removeItem('userData');
            return null;
        }

        return userData;
    } catch (error) {
        localStorage.removeItem('userData');
        return null;
    }
};

export const saveAuthData = (token: string, userId: string, expirationTime?: number): UserData => {
    const expiration = expirationTime
        ? new Date(new Date().getTime() + expirationTime)
        : calculateExpirationDate();

    const userData: UserData = {
        token,
        userId,
        expiration: expiration.toISOString()
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
};

export const removeAuthData = (): null => {
    localStorage.removeItem('userData');
    return null;
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
