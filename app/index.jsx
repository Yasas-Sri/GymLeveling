import { StatusBar } from 'expo-status-bar';
import {  ScrollView, Text, View,Image,ImageBackground,StyleSheet } from 'react-native';
import { Link,Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { overlay, PaperProvider } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';




export default function App() {
  return (
   <PaperProvider>
    
    <ImageBackground source={require('../assets/images/pullup.jpg')} resizeMode="cover" > 

   
    <View style={styles.overlay}/>

    {/* <SafeAreaView className="bg-primary h-full"> */}
       <ScrollView contentContainerStyle={{ height:'100%'}}>
      
          <View className="w-full justify-center items-center min-h-[85vh] px-4 ">
             
            
             <Image
               source={require('../assets/l1.png')}
               className="w-[130px] h-[84px]"
               resizeMode = "contain"
             />
             <Text className="font-bold text-3xl text-white">GymLeveling</Text>

             <CustomButton
                 title="Get Started"
                 handlePress={()=>router.push('/sign-in')}
                 containerStyles="w-full mt-7" 
             />
          
          
          

          </View>
        
        </ScrollView> 

        {/* <StatusBar backgroundColor='#161622' style='light'/> */}
    {/* </SafeAreaView> */}


    
    </ImageBackground>
    
      

    </PaperProvider> 
  );
}

const styles = StyleSheet.create({

    overlay:{
       ...StyleSheet.absoluteFillObject,
       backgroundColor:'rgba(17,17,79,0.5)' // 10 10 44
    }

})

