import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LogOut, Bell, Shield, HelpCircle, User, ChevronRight } from 'lucide-react-native';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import Colors from '@/constants/colors';
import useAuthStore from '@/store/authStore';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };
  
  const handleEditProfile = () => {
    // Navigate to profile edit screen (not implemented in this demo)
    console.log('Edit profile');
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Settings" />
        <View style={styles.centered}>
          <Text>Please log in to view settings</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Settings" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Avatar uri={user.avatar} size={80} />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.text} />
            </View>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: '#DDDDDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color={Colors.text} />
            </View>
            <Text style={styles.settingText}>Account Information</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={Colors.text} />
            </View>
            <Text style={styles.settingText}>Privacy & Security</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.text} />
            </View>
            <Text style={styles.settingText}>Help & Support</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.card,
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textLight,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F0F0F5',
  },
  editButtonText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  section: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
  },
  logoutText: {
    color: Colors.error,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: Colors.textLight,
    fontSize: 12,
    marginBottom: 24,
  },
});