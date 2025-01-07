//import { View, Text } from 'react-native'
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getUserRole } from "../api/signupData";
import useStore from "../store";
import { useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false); // after login
  const [hasRedirected1, setHasRedirected1] = useState(false);
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    const inAuthGroup = segments[0] === "(tabs)";
    if (!authState?.authenticated && fontsLoaded && !hasRedirected1) {
      SplashScreen.hideAsync();
      router.replace("/");
      setHasRedirected1(true);
    } else if (authState?.authenticated && !hasRedirected && fontsLoaded) {
      router.replace("/(tabs)");
      SplashScreen.hideAsync();
      setHasRedirected(true);
    }
  }, [
    authState,
    router,
    segments,
    hasRedirected,
    fontsLoaded,
    error,
    hasRedirected1,
  ]);

  if (error) throw error;
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  const [session, setSession] = useState(null);

  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};
export default RootLayout;
