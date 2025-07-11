export type AuthContextType = {
    token: string | null;
    userId: string | null;
    isLoggedIn: boolean;
    login: (token: string, userId: string, expirationTime?: number) => void;
    logout: () => void;
}

export type AuthResponseType = {
    token: string;
    userId: string;
    expirationTime: number;
}

export type AuthHookResult = {
    token: string | null;
    userId: string | null;
    isLoggedIn: boolean;
    login: (token: string, userId: string, expirationTime?: number) => void;
    logout: () => void;
}