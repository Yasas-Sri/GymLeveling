import { View, Text } from 'react-native'
import {Stack} from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Exercises from './Exercises';
import Preset from './Preset';


const RootLayout = () => {
  return (
   
   // <NavigationContainer>
     <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="(auth)" options={{headerShown:false}} />
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="Preset"  options={{headerShown:false}} />
        <Stack.Screen name="Exercises" options={{headerShown:false}} />
     </Stack>

// </NavigationContainer>

  )
}
export default RootLayout