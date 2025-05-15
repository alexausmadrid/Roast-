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
import { Group } from '@/types';

export default function CreateGroupScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addGroup, createChallenge, setCurrentGroup, setCurrentChallenge } = useAppStore();
  
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleCreateGroup = async () => {
    if (!user) {
      setError('You must be logged in to create a group');
      return;
    }
    
    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new group
      const newGroup: Group = {
        id: String(Date.now()),
        name: groupName.trim(),
        members: [user.id],
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        score: 0,
        lastActive: new Date().toISOString(),
      };
      
      addGroup(newGroup);
      
      // Create first challenge for this group
      const challengeId = createChallenge(newGroup.id);
      
      // Set current group and challenge
      setCurrentGroup(newGroup.id);
      setCurrentChallenge(challengeId);
      
      // Navigate to challenge screen
      router.replace('/challenge');
    } catch (error) {
      setError('Failed to create group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Create Group" showBack />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Create a new group to start roasting with your friends. Once created, you can invite others to join.
        </Text>
        
        <Input
          label="Group Name"
          placeholder="Enter a name for your group"
          value={groupName}
          onChangeText={setGroupName}
          containerStyle={styles.input}
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button
          title="Create Group"
          onPress={handleCreateGroup}
          loading={isLoading}
          style={styles.button}
          fullWidth
        />
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
});