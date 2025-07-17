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
    expirationTime?: number;
}

export type AuthenticationResultType = {
    isLogin: boolean;
    isLoading: boolean;
    error: string | null;
    switchMode: () => void;
    validateAndSubmit: (email: string, password: string, confirmPassword?: string) => boolean;
    isLoggedIn: boolean;
    logout: () => void;
}