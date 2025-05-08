import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Define types for our authentication data
type User = {
  id: string;
  fullName: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  signUp: (fullName: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  socialSignIn: (provider: 'google' | 'apple') => Promise<boolean>;
  error: string | null;
  clearError: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is signed in on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userJson = await AsyncStorage.getItem('user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Clear any error message
  const clearError = () => setError(null);

  // Sign in function
  const signIn = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    setIsLoading(true);
    clearError();

    try {
      // In a real app, you would validate credentials against a backend API
      // For now, we'll simulate a successful sign-in with mock data
      
      // Simple validation
      if (!email || !password) {
        setError('Email and password are required');
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful authentication
      const mockUser: User = {
        id: '123456',
        fullName: 'Garden User',
        email: email,
      };
      
      // Store user data
      setUser(mockUser);
      
      // If remember me is checked, store user data in AsyncStorage
      if (rememberMe) {
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      }
      
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in. Please check your credentials and try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (fullName: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();

    try {
      // In a real app, you would register the user with a backend API
      // For now, we'll simulate a successful registration
      
      // Simple validation
      if (!fullName || !email || !password) {
        setError('All fields are required');
        return false;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        fullName,
        email,
      };
      
      // Store user data
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Failed to create account. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Clear user data
      setUser(null);
      await AsyncStorage.removeItem('user');
      
      // Navigate to sign-in screen
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();

    try {
      // In a real app, you would send a password reset email
      // For now, we'll simulate a successful request
      
      if (!email) {
        setError('Email is required');
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Failed to send password reset email. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Social sign-in function
  const socialSignIn = async (provider: 'google' | 'apple'): Promise<boolean> => {
    setIsLoading(true);
    clearError();

    try {
      // In a real app, you would authenticate with the social provider
      // For now, we'll simulate a successful sign-in
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful authentication
      const mockUser: User = {
        id: `${provider}_${Date.now()}`,
        fullName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider}.example.com`,
      };
      
      // Store user data
      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      setError(`Failed to sign in with ${provider}. Please try again.`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    socialSignIn,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
