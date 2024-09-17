import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import CalendarBook1 from '../../components/CalendarBook1';
import CalendarPick from '../../components/CalendarPick';

const Schedule = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView> 
            <View className="justify-around items-start flex-row my-5">
                 <Text className="text-white text-2xl font-bold ">Workout Schedule</Text>
            </View>

            <CalendarPick/>

       </ScrollView> 
    </SafeAreaView>
  )
}

export default Schedule