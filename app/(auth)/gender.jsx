import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton'
import { Link,Redirect,router } from 'expo-router';



const GenIcon = ({icon,size,gender})=>{

  return(
    <View className="items-center justify-center gap-2">
      
         <MaterialCommunityIcons name={icon} size={size} color={"white"}/>
         <Text className="text-white text-lg font-pmedium">{gender}</Text>
      </View>
  ) 
}




const Gender = () => {

 
  
  const handleClick = () =>{

    router.push('/userInfo')   
  }

  return (
    <SafeAreaView className="bg-primary h-full">
       
       <View className="flex-1 justify-start items-center mt-10">
        <Text className="text-white text-2xl font-psemibold">Tell us about You</Text>

        <Text className="text-white text-2xl font-pmedium mt-10">Select</Text>

         <View className="mt-20 justify-between items-start flex-row gap-x-7  "> 

           <View className=" border-white border-2 px-4 py-4">
         <GenIcon
               icon="face-man-shimmer"  
               size={70}
               gender="Male"
               /> 
            </View>
         <View className=" border-white border-2 px-4 py-4">     
           <GenIcon
               icon="face-woman-shimmer"  
               size={70}
               gender="Female"
               />       
           </View>
         
           </View>

      </View>  
        
      <View className=" px-4 my-20">  
      <CustomButton
                title="Continue"
                handlePress={handleClick}
                containerStyles="mt-5"
                // isLoading={isSubmitting}
             />
        </View>     
    </SafeAreaView>
  )
}

export default Gender