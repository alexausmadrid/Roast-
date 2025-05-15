import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';
import Colors from '@/constants/colors';
import { Roast } from '@/types';
import { mockUsers } from '@/constants/mockData';
import useAuthStore from '@/store/authStore';
import useAppStore from '@/store/appStore';

interface RoastCardProps {
  roast: Roast;
  index: number;
}

const RoastCard: React.FC<RoastCardProps> = ({ roast, index }) => {
  const user = mockUsers.find(u => u.id === roast.userId);
  const currentUser = useAuthStore(state => state.user);
  const voteForRoast = useAppStore(state => state.voteForRoast);
  
  const hasVoted = currentUser ? roast.votes.includes(currentUser.id) : false;
  const voterAvatars = roast.votes
    .map(id => mockUsers.find(user => user.id === id))
    .filter(user => user !== undefined);
  
  const handleVote = () => {
    if (currentUser && !hasVoted) {
      voteForRoast(roast.id, currentUser.id);
    }
  };
  
  // Get a consistent color for this roast card based on index
  const getCardColor = () => {
    const colors = Colors.cardColors;
    return colors[index % colors.length];
  };
  
  if (!user) return null;
  
  return (
    <View style={[styles.container, { backgroundColor: getCardColor() }]}>
      <View style={styles.header}>
        <Avatar uri={user.avatar} size={40} />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      
      <Text style={styles.content}>{roast.content}</Text>
      
      <View style={styles.footer}>
        <View style={styles.votesContainer}>
          {voterAvatars.length > 0 && (
            <View style={styles.voters}>
              {voterAvatars.slice(0, 2).map((voter, i) => (
                voter && (
                  <View key={voter.id} style={[styles.voterAvatar, { zIndex: voterAvatars.length - i }]}>
                    <Avatar uri={voter.avatar} size={24} />
                  </View>
                )
              ))}
            </View>
          )}
          
          {roast.votes.length > 0 && (
            <Text style={styles.votesText}>
              {roast.votes.length} {roast.votes.length === 1 ? 'vote' : 'votes'}
            </Text>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.voteButton,
            hasVoted && styles.votedButton
          ]}
          onPress={handleVote}
          disabled={hasVoted || !currentUser}
        >
          <Text style={styles.voteButtonText}>Vote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: Colors.text,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  votesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voters: {
    flexDirection: 'row',
    marginRight: 8,
  },
  voterAvatar: {
    marginRight: -8,
  },
  votesText: {
    fontSize: 14,
    color: Colors.text,
  },
  voteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  votedButton: {
    opacity: 0.5,
  },
  voteButtonText: {
    fontWeight: '600',
    color: Colors.text,
  },
});

export default RoastCard;