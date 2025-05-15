import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flame } from 'lucide-react-native';
import { Group, User } from '@/types';
import Avatar from './Avatar';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import useAppStore from '@/store/appStore';
import { mockUsers } from '@/constants/mockData';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const router = useRouter();
  const setCurrentGroup = useAppStore(state => state.setCurrentGroup);
  
  // Get member data from IDs
  const members = group.members
    .map(id => mockUsers.find(user => user.id === id))
    .filter(user => user !== undefined) as User[];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    }
    
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Otherwise return formatted date
    return date.toLocaleDateString();
  };
  
  const handlePress = () => {
    setCurrentGroup(group.id);
    router.push('/challenge');
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{group.name}</Text>
        <Text style={styles.date}>{formatDate(group.lastActive)}</Text>
        
        <View style={styles.members}>
          {members.slice(0, 4).map((member, index) => (
            <View key={member.id} style={[styles.avatarContainer, { zIndex: members.length - index }]}>
              <Avatar uri={member.avatar} size={36} />
            </View>
          ))}
          
          {members.length > 4 && (
            <View style={styles.moreContainer}>
              <Text style={styles.moreText}>+{members.length - 4}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <Flame size={20} color="#FFFFFF" />
        <Text style={styles.scoreText}>{group.score}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.text,
  },
  date: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 16,
  },
  members: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: -8,
  },
  moreContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  moreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  scoreContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
});

export default GroupCard;