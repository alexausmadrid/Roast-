import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading, error } = useAuthStore();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Validate username
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }
    
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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    return isValid;
  };
  
  const handleSignup = async () => {
    if (validateForm()) {
      try {
        await signup(username, email, password);
        router.replace('/(tabs)');
      } catch (error) {
        // Error is handled by the store
      }
    }
  };
  
  const handleLoginPress = () => {
    router.push('/login');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      
      <View style={styles.form}>
        <Input
          label="Username"
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          error={usernameError}
        />
        
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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
        
        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={confirmPasswordError}
        />
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <Button
          title="Create Account"
          onPress={handleSignup}
          loading={isLoading}
          style={styles.button}
          fullWidth
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginText}>Log In</Text>
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
    marginBottom: 32,
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
  loginText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});