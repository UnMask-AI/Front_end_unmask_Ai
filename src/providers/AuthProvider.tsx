"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
} from "@/lib/services/auth.service";

const TOKEN_KEY = "unmask_token";
const USER_KEY = "unmask_user";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let storedToken: string | null = null;
      let storedUser: AuthUser | null = null;
      try {
        storedToken = localStorage.getItem(TOKEN_KEY);
        const u = localStorage.getItem(USER_KEY);
        if (u) storedUser = JSON.parse(u) as AuthUser;
      } catch {
        /* ignore */
      }

      if (!storedToken) {
        if (!cancelled) setReady(true);
        return;
      }

      // Show cached user immediately, then verify against /auth/me.
      if (storedUser && !cancelled) {
        setToken(storedToken);
        setUser(storedUser);
      }

      try {
        const fresh = await fetchCurrentUser(storedToken);
        if (cancelled) return;
        if (fresh) {
          localStorage.setItem(USER_KEY, JSON.stringify(fresh));
          setToken(storedToken);
          setUser(fresh);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setToken(null);
          setUser(null);
        }
      } catch {
        // Network error — keep cached session, surface error elsewhere.
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((t: string, u: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(t);
    setUser(u);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await loginUser(email, password);
      if (!res.access_token || !res.user) {
        throw new Error(res.detail || "Login failed");
      }
      persist(res.access_token, res.user);
      router.push("/dashboard");
    },
    [persist, router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await registerUser(name, email, password);
      if (!res.access_token || !res.user) {
        throw new Error(res.detail || "Registration failed");
      }
      persist(res.access_token, res.user);
      router.push("/dashboard");
    },
    [persist, router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      token,
      ready,
      login,
      register,
      logout,
    }),
    [user, token, ready, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
