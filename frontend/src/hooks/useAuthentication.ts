import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { authService } from "../services/auth-services";
import type {AuthenticationResultType, AuthResponseType} from "../types/authType";

export const useAuthentication = (): AuthenticationResultType => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [validationError, setValidationError] = useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            return authService.login(email, password);
        },
        onSuccess: (data: AuthResponseType) => {
            auth.login(data.token, data.userId, data.expirationTime || 3600000);
            navigate('/');
        }
    });

    const registerMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            return authService.register(email, password);
        },
        onSuccess: (data: AuthResponseType) => {
            auth.login(data.token, data.userId, data.expirationTime || 3600000);
            navigate('/');
        }
    });

    const isLoading = loginMutation.isPending || registerMutation.isPending;

    const error = validationError || (isLogin
        ? loginMutation.error?.message ?? null
        : registerMutation.error?.message ?? null);

    const switchMode = () => {
        setIsLogin((prev) => !prev);
        setValidationError(null);
        loginMutation.reset();
        registerMutation.reset();
    };

    const validateAndSubmit = (email: string, password: string, confirmPassword?: string) => {
        setValidationError(null);

        if (!email || !email.includes('@') || !password || password.length < 6) {
            setValidationError("Please verify your information");
            return false;
        }

        if (!isLogin && password !== confirmPassword) {
            setValidationError("Passwords do not match");
            return false;
        }

        if (isLogin) {
            loginMutation.mutate({ email, password });
        } else {
            registerMutation.mutate({ email, password });
        }

        return true;
    };

    return {
        isLogin,
        isLoading,
        error,
        switchMode,
        validateAndSubmit,
        isLoggedIn: auth.isLoggedIn,
        logout: auth.logout
    };
};