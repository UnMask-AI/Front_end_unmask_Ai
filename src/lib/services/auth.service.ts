import { api } from "@/lib/api";

export type AuthSessionUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
};

export async function loginUser(email: string, password: string) {
  return api.login(email, password) as Promise<{
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    user?: AuthSessionUser;
    detail?: string;
  }>;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  return api.register(email, password, name) as Promise<{
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    user?: AuthSessionUser;
    detail?: string;
  }>;
}

/** Validate a stored token by hitting /auth/me. Returns user or null on 401/expired. */
export async function fetchCurrentUser(
  token: string
): Promise<AuthSessionUser | null> {
  const res = await api.getMe(token);
  if (res.status && res.status >= 400) return null;
  if (!res.id || !res.email || !res.name) return null;
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    phone: res.phone ?? null,
  };
}
