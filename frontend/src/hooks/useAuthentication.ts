import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export type AuthenticationResultType = {
  isLogin: boolean;
  isLoading: boolean;
  error: string | null;
  switchMode: () => void;
  validateAndSubmit: (email: string, password: string, confirmPassword?: string) => boolean;
  isLoggedIn: boolean;
  logout: () => void;
};

export const useAuthentication = (): AuthenticationResultType => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (!authContext) {
    throw new Error('useAuthentication must be used within AuthProvider');
  }

  const { login, register, logout, isAuthenticated } = authContext;

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return login(email, password);
    },
    onSuccess: () => {
      navigate(from, { replace: true });
    }
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return register(email, password);
    },
    onSuccess: () => {
      navigate(from, { replace: true });
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
    isLoggedIn: isAuthenticated,
    logout
  };
};