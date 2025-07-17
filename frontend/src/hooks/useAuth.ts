import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStoredAuth, saveAuthData, removeAuthData } from '../api/auth';
import type {LoginParams, UserData} from "../types/userDataType.ts";
import type {AuthContextType} from "../types/authType.ts";

export const AUTH_QUERY_KEY = ['auth'];

export const useAuth = (): AuthContextType => {
    const queryClient = useQueryClient();

    const { data: authData } = useQuery<UserData | null>({
        queryKey: AUTH_QUERY_KEY,
        queryFn: fetchStoredAuth,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
    });

    const { mutate: login } = useMutation<UserData, Error, LoginParams>({
        mutationFn: async (params: LoginParams): Promise<UserData> => {
            const { token, userId, expirationTime } = params;
            const userData = saveAuthData(token, userId, expirationTime);

            // Configuring the timeout for automatic disconnection
            const expiration = new Date(userData.expiration);
            const remainingTime = expiration.getTime() - new Date().getTime();
            if (remainingTime > 0) {
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
                }, remainingTime);
            }

            return userData;
        },
        onSuccess: (userData) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, userData);
        }
    });

    const { mutate: logout } = useMutation<null | Error | void>({
        mutationFn: async (): Promise<null> => {
            return removeAuthData();
        },
        onSuccess: () => {
            queryClient.setQueryData(AUTH_QUERY_KEY, null);
        }
    });

    const handleLogin = useCallback((token: string, userId: string, expirationTime?: number) => {
        login({ token, userId, expirationTime });
    }, [login]);

    return {
        token: authData?.token || null,
        userId: authData?.userId || null,
        isLoggedIn: !!authData?.token,
        login: handleLogin,
        logout
    };
};