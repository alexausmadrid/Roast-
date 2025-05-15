import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircle } from 'lucide-react-native';
import Header from '@/components/Header';
import GroupCard from '@/components/GroupCard';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';
import useAppStore from '@/store/appStore';

export default function GroupsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { groups } = useAppStore();
  
  // Filter groups that the current user is a member of
  const userGroups = user 
    ? groups.filter(group => group.members.includes(user.id))
    : [];
  
  // Sort groups by last active date (most recent first)
  const sortedGroups = [...userGroups].sort((a, b) => {
    return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
  });
  
  const handleCreateGroup = () => {
    router.push('/create-group');
  };
  
  const handleJoinGroup = () => {
    router.push('/join-group');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Your Groups" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {userGroups.length > 0 ? (
            <View style={styles.groupsList}>
              {sortedGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No groups yet</Text>
              <Text style={styles.emptyStateText}>
                Create a group or join an existing one to start roasting!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={handleCreateGroup}
        >
          <PlusCircle size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create Group</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.joinButton} 
          onPress={handleJoinGroup}
        >
          <Text style={styles.joinButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Extra padding for footer
  },
  groupsList: {
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.text,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.textLight,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
    flexDirection: 'row',
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  joinButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});