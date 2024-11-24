import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import CustomIconButton from "../../components/CustomIconButton";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { getSchedule } from "../../api/saveBooking";
import useStore from "../../store";

// const getActivities = (data) => {
//   // const todayActivities = [];
//   // const upcomingActivities = [];
//   const { saveBookings } = data;
//   const today = new Date().toISOString().split("T")[0];

//   const todayActivities = saveBookings.filter(
//     (activity) => activity.booked_date === today,
//   );
//   const upcomingActivities = saveBookings.filter(
//     (activity) => activity.booked_date > today,
//   );

//   return { todayActivities, upcomingActivities };
// };
const filterActivities = (activities) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const todaysActivities = [];
  const upcomingActivities = [];
  activities.forEach((activity) => {
    if (activity.booked_date === today) {
      todaysActivities.push(activity);
    } else if (new Date(activity.booked_date) > new Date(today)) {
      upcomingActivities.push(activity);
    }
  });

  return { todaysActivities, upcomingActivities };
};

const Home = () => {
  // const saveBookings = useStore();
  const saveBookings = useStore((state) => state.saveBookings);
  useEffect(() => {
    getSchedule();
    // setActivities(activities);
  }, []);
  // const { todayActivities, upcomingActivities } = useStore(getActivities);
  // //  console.log(todaysActivities);
  // console.log(upcomingActivities);
  // console.log(todayActivities);
  //console.log(saveBookings);
  const { todaysActivities, upcomingActivities } =
    filterActivities(saveBookings);
  console.log(upcomingActivities);
  const renderItem = ({ item }) => {
    //console.log(item.id);
    return (
      <View className=" bg-cardB border-borderB border p-4 rounded-2xl mt-1 mb-5 w-full ">
        <View className=" justify-between">
          <View className="flex-row gap-x-2">
            <View className="flex-1">
              <Text className="text-white text-base ">{item.booked_date}</Text>
            </View>

            {/* <View className="flex-row-reverse gap-20">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true);
                  setId(item.id);
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View className="flex-row gap-5">
            <View className="flex-row ">
              <Text className="text-white text-base font-pmedium ">
                {item.event} -{" "}
              </Text>
              <Text className="text-white text-base font-pmedium">
                {item.booked_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" min-h-[75vh]">
          <View my-6 px-4 space-y-6>
            <View className="justify-between items-start flex-row ">
              <View>
                <Text className="text-white mt-6 mx-4">Welcome </Text>
                <Text className="text-white mt-2 mx-4">Name </Text>
              </View>

              <View className="mt-2">
                <CustomIconButton icon="bell" iconColor={"#CDCDE0"} size={20} />
              </View>
            </View>
          </View>

          <CustomCard
            title="Today's activites"
            containerStyles="min-w-2 mx-4 my-4 border-2 border-borderB text-white"
            color="bg-cardB "
            style="text-white"
          />
          <FlatList
            data={upcomingActivities}
            // keyExtractor={(item, index) =>
            //   item.id ? item.id.toString() : index.toString()
            // }
            //keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
