import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
        router.replace('/(tabs)');
      } catch (error) {
        // Error is handled by the store
      }
    }
  };
  
  const handleSignupPress = () => {
    router.push('/signup');
  };
  
  // For demo purposes, let's add a quick login function
  const handleQuickLogin = async () => {
    try {
      await login('alex@example.com', 'password');
      router.replace('/(tabs)');
    } catch (error) {
      // Error is handled by the store
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Log In</Text>
      </View>
      
      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <Button
          title="Log In"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
          fullWidth
        />
        
        <TouchableOpacity onPress={handleQuickLogin} style={styles.quickLoginButton}>
          <Text style={styles.quickLoginText}>Quick Demo Login</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignupPress}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: Colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: 24,
  },
  errorText: {
    color: Colors.error,
    marginTop: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  footerText: {
    color: Colors.textLight,
    marginRight: 4,
  },
  signupText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  quickLoginButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  quickLoginText: {
    color: Colors.primary,
    fontSize: 14,
  },
});