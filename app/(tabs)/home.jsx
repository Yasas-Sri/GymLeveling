import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CustomCard from '../../components/CustomCard'
import CustomIconButton from '../../components/CustomIconButton'
import { IconButton, MD3Colors } from 'react-native-paper';

const Home = () => {
  return (
    <SafeAreaView  className="bg-primary h-full">
        <ScrollView>
         <View className=" min-h-[75vh]">
          <View my-6 px-4 space-y-6>
          <View className="justify-between items-start flex-row ">
           <View> 
          <Text className="text-white mt-6 mx-4">Welcome </Text>
          <Text className="text-white mt-2 mx-4">Name </Text> 
          </View>

          <View className="mt-2">
             <CustomIconButton
                icon="bell"
                iconColor={'#CDCDE0'}
                size={20}
            
             />
            
            </View>
            </View>
          </View>
            
            
              <CustomCard
               title="Today's activites"
               containerStyles="min-w-2 mx-4 my-4 border-2 border-borderB text-white"
               color="bg-cardB "
               style="text-white"
              />
                          
 
          </View>
          </ScrollView>
    </SafeAreaView>
  )
}

export default Home