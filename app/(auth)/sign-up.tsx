import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();
  
  // Get authentication context
  const { signUp, socialSignIn, isLoading, error, clearError } = useAuth();

  const handleSignUp = async () => {
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLocalLoading(true);
    clearError();

    try {
      // Use the signUp method from AuthContext
      const success = await signUp(fullName, email, password);
      
      if (success) {
        // Navigate to the main app
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Sign up error:', error);
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
            resizeMode="contain"
          />
          <Text style={styles.appName}>Paxton's Garden</Text>
          <Text style={styles.tagline}>Grow, Eat, and Meditate</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an Account</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />
          
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
          
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />
          
          <View style={styles.termsContainer}>
            <Checkbox.Item
              label="I agree to the Terms of Service and Privacy Policy"
              status={agreeToTerms ? 'checked' : 'unchecked'}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              position="leading"
              style={styles.checkbox}
              labelStyle={styles.checkboxLabel}
              color="#4CAF50"
            />
          </View>
          
          <Button
            mode="contained"
            onPress={handleSignUp}
            style={styles.button}
            loading={isLoading || localLoading}
            disabled={isLoading || localLoading}
          >
            Sign Up
          </Button>
          
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signinLink}>Sign In</Text>
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
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
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
  termsContainer: {
    marginBottom: 24,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signinText: {
    color: '#666666',
  },
  signinLink: {
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
