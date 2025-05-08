import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();
  
  // Get authentication context
  const { signIn, socialSignIn, isLoading, error, clearError } = useAuth();

  const handleSignIn = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLocalLoading(true);
    clearError();

    try {
      // Use the signIn method from AuthContext
      const success = await signIn(email, password, rememberMe);
      
      if (success) {
        // Navigate to the main app
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLocalLoading(false);
    }
  };
  
  // Handle social sign-in
  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setLocalLoading(true);
    clearError();
    
    try {
      const success = await socialSignIn(provider);
      
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Check for remembered email on component mount
  useEffect(() => {
    const checkRememberedEmail = async () => {
      try {
        const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
          setEmail(rememberedEmail);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error checking remembered email:', error);
      }
    };

    checkRememberedEmail();
  }, []);
  
  // Clear any error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/paxton_icon.png')} 
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.appName}>Paxton's Garden</Text>
          <Text style={styles.tagline}>Grow, Eat, and Meditate</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />
          
          <View style={styles.checkboxRow}>
            <Checkbox.Item
              label="Remember me"
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              position="leading"
              style={styles.checkbox}
              labelStyle={styles.checkboxLabel}
              color="#4CAF50"
            />
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          
          <Button
            mode="contained"
            onPress={handleSignIn}
            style={styles.button}
            loading={isLoading || localLoading}
            disabled={isLoading || localLoading}
          >
            Sign In
          </Button>
          
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialSignIn('google')}
              disabled={isLoading || localLoading}
            >
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialSignIn('apple')}
              disabled={isLoading || localLoading}
            >
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  forgotPassword: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  button: {
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#666666',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#757575',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialButtonText: {
    fontWeight: '600',
  },
});
