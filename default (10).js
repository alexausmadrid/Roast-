import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Flame } from 'lucide-react-native';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  const handleSignup = () => {
    router.push('/signup');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Flame size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>RoastMaster</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Daily Roast Battles</Text>
        <Text style={styles.subtitle}>
          Create groups, submit your best roasts, and vote for the funniest comebacks
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Log In" 
          onPress={handleLogin} 
          style={styles.button}
          fullWidth
        />
        <Button 
          title="Sign Up" 
          onPress={handleSignup} 
          variant="outline"
          style={styles.button}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    marginBottom: 16,
  },
});