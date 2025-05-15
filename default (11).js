import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';
import useAppStore from '@/store/appStore';

export default function JoinGroupScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { groups, joinGroup, setCurrentGroup } = useAppStore();
  
  const [groupCode, setGroupCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleJoinGroup = async () => {
    if (!user) {
      setError('You must be logged in to join a group');
      return;
    }
    
    if (!groupCode.trim()) {
      setError('Please enter a group code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find group by ID (in a real app, this would be a unique invite code)
      const group = groups.find(g => g.id === groupCode.trim());
      
      if (!group) {
        throw new Error('Group not found. Please check the code and try again.');
      }
      
      // Check if user is already a member
      if (group.members.includes(user.id)) {
        throw new Error('You are already a member of this group.');
      }
      
      // Join group
      joinGroup(group.id, user.id);
      
      // Set current group
      setCurrentGroup(group.id);
      
      // Navigate to group screen
      router.replace('/(tabs)');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to join group');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Join Group" showBack />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter the group code provided by your friend to join their roasting group.
        </Text>
        
        <Input
          label="Group Code"
          placeholder="Enter group code"
          value={groupCode}
          onChangeText={setGroupCode}
          containerStyle={styles.input}
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button
          title="Join Group"
          onPress={handleJoinGroup}
          loading={isLoading}
          style={styles.button}
          fullWidth
        />
        
        <Text style={styles.helpText}>
          For demo purposes, use group codes "1", "2", or "3" to join the mock groups.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    marginBottom: 24,
  },
  errorText: {
    color: Colors.error,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  helpText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});