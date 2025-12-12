import * as React from "react";
import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { ChildrenType } from "../types/childrenType";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<ChildrenType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Message plus clair pour l'erreur de confirmation d'email
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please confirm your email address before logging in. Check your inbox.');
      }
      throw new Error(error.message);
    }

    setUser(data.user);
    setSession(data.session);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    // Si l'email n'est pas auto-confirmé, afficher un message
    if (data.user && !data.session) {
      throw new Error('Please check your email to confirm your account before logging in.');
    }

    setUser(data.user);
    setSession(data.session);
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(null);
    setSession(null);
  }, []);

  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      session,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, session, login, register, logout]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// Export alias for compatibility
export const AuthProvider = AuthContextProvider;