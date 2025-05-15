import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // You can add custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="signup" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="challenge" options={{ animation: 'fade' }} />
        <Stack.Screen name="create-group" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="join-group" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="group-details" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});