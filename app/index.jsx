import { StatusBar } from 'expo-status-bar';
import {  ScrollView, Text, View,Image } from 'react-native';
import { Link,Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { PaperProvider } from 'react-native-paper';


export default function App() {
  return (
   <PaperProvider> 
    <SafeAreaView className="bg-primary h-full">
       <ScrollView contentContainerStyle={{ height:'100%'}}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
             <Image
               source={require('../assets/l1.png')}
             />
             <Text className="text-3xl text-white">GymLeveling</Text>

             <CustomButton
                 title="Get Started"
                 handlePress={()=>router.push('/sign-in')}
                 containerStyles="w-full mt-7" 
             />
          </View>
        </ScrollView> 

        {/* <StatusBar backgroundColor='#161622' style='light'/> */}
    </SafeAreaView>
    </PaperProvider> 
  );
}


