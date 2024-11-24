import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Calendar } from 'react-native-calendars';
// import CalendarBook1 from '../../components/CalendarBook1';
import CalendarPick from "../../components/CalendarPick";
import { getSchedule } from "../../api/saveBooking";

const Schedule = () => {
  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-around items-start flex-row my-5">
          <Text className="text-white text-2xl font-bold ">
            Workout Schedule
          </Text>
        </View>
        <View className="m-2">
          <CalendarPick />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;
