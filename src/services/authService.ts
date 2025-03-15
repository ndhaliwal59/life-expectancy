// authService.ts
const API_URL = import.meta.env.VITE_API_URL || '/api/auth';

interface UserData {
  email: string;
  password: string;
}

interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

// Login user with better error handling
export const login = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Required for cookies if using HTTP-only tokens
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data: AuthResponse = await response.json();
    
    if (data.token && data.user) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Enhanced logout with cleanup
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Add any additional cleanup for cookies or session storage if needed
};

// Type-safe current user retrieval
export const getCurrentUser = (): { id: string; name: string; email: string } | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    if (user?.id && user?.email) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Robust authentication check
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();
  return !!token && !!user;
};
