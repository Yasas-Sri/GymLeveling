import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useFocusEffect, useCallback } from "react";
import RNButton from "../../../components/RNButton";
//import ExerciseInfo from "./ExerciseInfo";
import Summary from "./Summary";
import { useLocalSearchParams } from "expo-router";
import useStore from "../../../store";
import { router } from "expo-router";
import ExerciseInfo from "./ExerciseInfo";

const ExerciseData = () => {
  const [activeComponent, setActiveComponent] = useState("Info");
  const { exerciseId } = useLocalSearchParams();

  const exercises = useStore((state) => state.exerciseMap);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 75 }}>
        <View className="bg-primary h-full  ">
          <View className="justify-center  flex-row mt-10">
            <TouchableOpacity
              onPress={() => {
                setActiveComponent("Info");
                //setroutineId(item.id);
              }}
            >
              <View
                className={`rounded-l-2xl    w-24 h-12 justify-center gap-x-1  ${activeComponent === "Info" ? "bg-secondary" : "bg-lightB"} `}
              >
                <Text className=" justify-center self-center   text-white text-base m-2">
                  Info
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveComponent("Summary");
                //setroutineId(item.id);
              }}
            >
              <View
                className={`rounded-r-2xl w-24 h-12 justify-center  ${activeComponent === "Summary" ? "bg-secondary" : "bg-lightB"} `}
              >
                <Text className="m-2  text-white text-base  justify-center self-center">
                  Summary
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: exercises[exerciseId].gifUrl }}
            className="w-fit h-96 mt-8"
          />

          {activeComponent === "Info" && (
            <View className="mt-8">
              <ExerciseInfo exerciseId={exerciseId} />
            </View>
          )}
          {activeComponent === "Summary" && (
            <View className="mt-8">
              <Summary exercise={exerciseId} />
            </View>
          )}
          {/* {activeComponent === "Info" && (
            <SafeAreaView className="bg-primary h-full">
              <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
                <View className=" justify-center   min-h-[72vh]  w-full  mt-0">
                  <View className=" min-h-[75vh]">
                    <Image
                      source={{ uri: exercises[exerciseId].gifUrl }}
                      className="w-fit h-2/3"
                    />
                  </View>

                  <Text className="text-white text-base font-pmedium justify-center self-center mt-5">
                    {" "}
                    {exercises[exerciseId].name}
                  </Text>

                  <View className="flex-row  ">
                    <View className=" ">
                      <Text className=" text-base  mt-5 ml-3   px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">
                        Body Part
                      </Text>
                      <Text className=" text-base  mt-2 ml-3 px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">
                        Target
                      </Text>
                      <Text className=" text-base  mt-2 ml-3 px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">
                        Equipment
                      </Text>
                    </View>

                    <View className=" mr-3 flex-1">
                      <Text className="text-white text-base  mt-5 px-4 py-4  border-borderB border font-pregular bg-cardB">
                        {" "}
                        {exercises[exerciseId].bodyPart}
                      </Text>
                      <Text className="text-white text-base  mt-2 px-4 py-4  border-borderB border font-pregular bg-cardB">
                        {" "}
                        {exercises[exerciseId].target}
                      </Text>
                      <Text className="text-white text-base   mt-2 px-4 py-4  border-borderB border font-pregular bg-cardB">
                        {" "}
                        {exercises[exerciseId].equipment}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-white m-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, quo nisi odio deserunt iure dolores consequuntur
                    officiis placeat eos cum architecto nulla odit. Itaque
                    excepturi dignissimos voluptates perferendis, nostrum rerum.
                  </Text>
                </View>
              </ScrollView>
            </SafeAreaView>
            
          )}
           */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseData;
