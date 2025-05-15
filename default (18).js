import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Flame, Clock, Package, Settings } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightIcon?: 'clock' | 'package' | 'settings';
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'roastmaster', 
  showBack = false,
  rightIcon,
  onRightIconPress
}) => {
  const router = useRouter();
  
  const handleBackPress = () => {
    router.back();
  };
  
  const renderRightIcon = () => {
    if (!rightIcon) return null;
    
    let Icon;
    switch (rightIcon) {
      case 'clock':
        Icon = Clock;
        break;
      case 'package':
        Icon = Package;
        break;
      case 'settings':
        Icon = Settings;
        break;
    }
    
    return (
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={onRightIconPress}
      >
        <Icon size={24} color={Colors.text} />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Flame size={24} color="#FFFFFF" />
            </View>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {renderRightIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default Header;