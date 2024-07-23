import { View, Text } from 'react-native'
import {Stack} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Exercises from './Exercises';
import Preset from './Preset';
import {useFonts} from 'expo-font'


const RootLayout = () => {

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

  return (
   
  
     <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="(auth)" options={{headerShown:false}} />
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="Preset"  options={{headerShown:false}} />
        <Stack.Screen name="Exercises" options={{headerShown:false}} />
     </Stack>



  )
}
export default RootLayout