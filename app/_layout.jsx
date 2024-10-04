//import { View, Text } from 'react-native'
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [session, setSession] = useState(null);

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
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Track the auth state
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setSession(session);
        } else {
          setSession(null);
        }
      },
    );

    // Clean up the listener when the component unmounts
    return () => {
      // subscription.unsubscribe()
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (session) {
  //     router.replace('./(tabs)/home'); // Replace the current stack
  //   } else {
  //     router.replace('/(auth)'); // Navigate to auth stack
  //   }
  // }, [session]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      {/* {session && 
     <SignInStack />
      }
  

   {!session && 
       <SignOutStack />
     } */}

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
export default RootLayout;
