import type { UserData } from "../types/userDataType.ts";

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