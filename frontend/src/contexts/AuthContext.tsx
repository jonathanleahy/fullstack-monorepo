import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { graphqlClient } from '../services/graphql';
import type { AuthContextType, User, LoginInput, RegisterInput, AuthPayload, TokenPayload } from '../types/auth';

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`;

const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const ME_QUERY = `
  query Me {
    me {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
`;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { AuthContextType };

const REFRESH_TOKEN_KEY = 'refreshToken';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthHeaders = useCallback((token: string | null) => {
    if (token) {
      graphqlClient.setHeader('Authorization', `Bearer ${token}`);
    } else {
      graphqlClient.setHeader('Authorization', '');
    }
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const data = await graphqlClient.request<{ login: AuthPayload }>(LOGIN_MUTATION, { input });
    const { user: loggedInUser, accessToken: token, refreshToken } = data.login;

    setUser(loggedInUser);
    setAccessToken(token);
    setAuthHeaders(token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }, [setAuthHeaders]);

  const register = useCallback(async (input: RegisterInput) => {
    const data = await graphqlClient.request<{ register: AuthPayload }>(REGISTER_MUTATION, { input });
    const { user: registeredUser, accessToken: token, refreshToken } = data.register;

    setUser(registeredUser);
    setAccessToken(token);
    setAuthHeaders(token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }, [setAuthHeaders]);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setAuthHeaders(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }, [setAuthHeaders]);

  const refreshTokenFn = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefreshToken) {
      throw new Error('No refresh token');
    }

    const data = await graphqlClient.request<{ refreshToken: TokenPayload }>(
      REFRESH_TOKEN_MUTATION,
      { refreshToken: storedRefreshToken }
    );

    const { accessToken: newToken, refreshToken: newRefreshToken } = data.refreshToken;
    setAccessToken(newToken);
    setAuthHeaders(newToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
  }, [setAuthHeaders]);

  // Try to restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!storedRefreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Refresh the token first
        await refreshTokenFn();

        // Then fetch user info
        const data = await graphqlClient.request<{ me: User }>(ME_QUERY);
        setUser(data.me);
      } catch {
        // Failed to restore session, clear everything
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [refreshTokenFn, logout]);

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken: refreshTokenFn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook is in hooks/useAuth.ts to satisfy react-refresh
