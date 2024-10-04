import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

//import { s, vs, ms } from 'react-native-size-matters';
import useStore from "../../../store";
import CustomButton from "../../../components/CustomButton";

const Preset = () => {
  const saveRoutines = useStore((state) => state.saveRoutines);
  const routineData = useStore((state) => state.routineList);

  // useEffect(() => {
  //   // You can add logic here if needed to fetch or update `saveRoutines`
  //   // For example, fetching from a server or local storage.

  //   renderItem({saveRoutines});
  // }, []);

  // const handleClick = () =>{

  //   router.push('/userPhoto')
  // }

  // console.log(saveRoutines);

  const renderItem = ({ item }) => {
    const routine = routineData.find((ex) => item.routineId === ex.id);

    return (
      <View className=" bg-cardB border-borderB border p-4 rounded-lg mt-1 mb-10 w-full">
        <Text className="text-white text-lg ">{routine.title}</Text>

        <CustomButton
          title="Start Routine"
          // handlePress={handleSave}
          containerStyles="mt-7"
          //isLoading={loading}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mb-12">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-psemibold">
            Routines
          </Text>
          <View className="flex-1 justify-start items-center">
            <View className="mt-8 justify-between items-start flex-row gap-x-5 ">
              <TouchableOpacity
                onPress={() => router.push("/Workout/NewRoutine")}
              >
                <View
                  className=" bg-cardB border-borderB border px-4 py-4 flex-row gap-x-1 rounded-3xl ml-2"
                  style={{ marginleft: 5 }}
                >
                  <FontAwesome name="wpforms" size={20} color="white" />
                  <Text className="text-white font-pregular ">
                    New Routines
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/Workout/ExploreRoutines")}
              >
                <View
                  className=" bg-cardB border-borderB border px-4 py-4 flex-row gap-x-1 rounded-3xl mr-2"
                  style={{ marginleft: 5 }}
                >
                  <FontAwesome5 name="search" size={20} color="white" />
                  <Text className="text-white font-pregular">
                    Explore Routines
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="  mt-16  px-4">
            {!saveRoutines.length && (
              <View className="self-center">
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={150}
                  color="grey"
                />
              </View>
            )}

            {saveRoutines && (
              <FlatList
                data={saveRoutines}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Preset;
