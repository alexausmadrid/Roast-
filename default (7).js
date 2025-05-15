import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Clock, Package } from 'lucide-react-native';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import RoastCard from '@/components/RoastCard';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';
import useAppStore from '@/store/appStore';
import { mockUsers } from '@/constants/mockData';

export default function ChallengeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    groups, 
    challenges, 
    roasts, 
    situations,
    currentGroup,
    addRoast,
  } = useAppStore();
  
  const [roastText, setRoastText] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  
  // Get current group
  const group = groups.find(g => g.id === currentGroup);
  
  // Get latest challenge for this group
  const challenge = challenges
    .filter(c => c.groupId === currentGroup)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  
  // Get situation text
  const situationText = challenge ? situations[parseInt(challenge.situationId) % situations.length] : '';
  
  // Get roasts for this challenge
  const challengeRoasts = challenge 
    ? roasts.filter(r => challenge.roasts.includes(r.id))
    : [];
  
  // Check if user has already submitted a roast
  const userRoast = user 
    ? challengeRoasts.find(r => r.userId === user.id)
    : null;
  
  // Format expiration time
  useEffect(() => {
    if (!challenge) return;
    
    const updateRemainingTime = () => {
      const now = new Date();
      const expiresAt = new Date(challenge.expiresAt);
      const diff = expiresAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        setRemainingTime('Expired');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setRemainingTime(`${hours}h ${minutes}m`);
    };
    
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [challenge]);
  
  // Set hasSubmitted based on userRoast
  useEffect(() => {
    if (userRoast) {
      setHasSubmitted(true);
    }
  }, [userRoast]);
  
  const handleSubmitRoast = () => {
    if (!user || !challenge || !roastText.trim()) return;
    
    addRoast({
      userId: user.id,
      groupId: currentGroup || '',
      situationId: challenge.id,
      content: roastText.trim(),
    });
    
    setRoastText('');
    setHasSubmitted(true);
  };
  
  const handleViewResults = () => {
    // This would navigate to a results screen in a full implementation
    console.log('View results');
  };
  
  if (!group || !challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Challenge" showBack />
        <View style={styles.centered}>
          <Text>No active challenge found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Get group members
  const members = group.members
    .map(id => mockUsers.find(user => user.id === id))
    .filter(user => user !== undefined);
  
  // Count responses
  const responseCount = challengeRoasts.length;
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header 
        title="Challenge" 
        showBack 
        rightIcon="package"
        onRightIconPress={handleViewResults}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.situationCard}>
            <Text style={styles.situationTitle}>Today's Situation</Text>
            <Text style={styles.situationText}>{situationText}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.expiresContainer}>
              <Clock size={16} color={Colors.textLight} />
              <Text style={styles.expiresText}>Expires in {remainingTime}</Text>
            </View>
            
            <View style={styles.membersRow}>
              {members.slice(0, 4).map((member, index) => (
                member && (
                  <View key={member.id} style={[styles.memberAvatar, { zIndex: members.length - index }]}>
                    <Avatar uri={member.avatar} size={28} />
                  </View>
                )
              ))}
              <Text style={styles.responseCount}>
                {responseCount}/{members.length} responses
              </Text>
            </View>
          </View>
          
          <View style={styles.roastSection}>
            <Text style={styles.sectionTitle}>Your Roast</Text>
            
            {!hasSubmitted ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Write your roast here..."
                  placeholderTextColor="#999"
                  multiline
                  value={roastText}
                  onChangeText={setRoastText}
                  maxLength={280}
                />
                <View style={styles.inputFooter}>
                  <Text style={styles.charCount}>{roastText.length}/280 characters</Text>
                  <Button
                    title="Submit Roast"
                    onPress={handleSubmitRoast}
                    disabled={!roastText.trim()}
                    size="small"
                  />
                </View>
              </View>
            ) : (
              <View style={styles.submittedContainer}>
                <Text style={styles.submittedText}>
                  You've submitted your roast! Check out what others have to say.
                </Text>
              </View>
            )}
          </View>
          
          {hasSubmitted && challengeRoasts.length > 0 && (
            <View style={styles.allRoastsSection}>
              <Text style={styles.sectionTitle}>All Roasts</Text>
              
              {challengeRoasts.map((roast, index) => (
                <RoastCard key={roast.id} roast={roast} index={index} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  situationCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  situationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  situationText: {
    fontSize: 20,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  expiresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiresText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 6,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    marginRight: -8,
  },
  responseCount: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 12,
  },
  roastSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.text,
  },
  inputContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
  },
  input: {
    minHeight: 100,
    fontSize: 16,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  charCount: {
    fontSize: 14,
    color: Colors.textLight,
  },
  submittedContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  submittedText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  allRoastsSection: {
    marginBottom: 24,
  },
});