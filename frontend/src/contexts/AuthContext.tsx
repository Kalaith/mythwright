import { createAuth } from '@webhatchery/auth-react';
import { buildApiUrl as buildApiEndpointUrl, setTokenProvider } from '../api/client';

export interface User {
  id: string;
  email: string;
  display_name: string;
  username: string;
  role: string;
  is_verified?: boolean;
  is_guest?: boolean;
  auth_type?: 'frontpage' | 'guest';
  created_at?: string;
  updated_at?: string;
}

function requiredEnv(name: string): string {
  const value = import.meta.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const { AuthProvider, useAuth } = createAuth<User>({
  guestAuthStorageKey: 'writers-studio-guest-session',
  loginUrl: requiredEnv('VITE_WEBHATCHERY_LOGIN_URL'),
  signupUrl: requiredEnv('VITE_WEBHATCHERY_SIGNUP_URL'),
  buildApiUrl: (path) => buildApiEndpointUrl(
    requiredEnv('VITE_API_BASE_URL'),
    requiredEnv('VITE_API_VERSION'),
    path,
  ),
  setTokenProvider,
});

export { AuthProvider, useAuth };
