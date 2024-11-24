import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import useStore from "../../../store";

const ExerciseInfo = ({ exerciseId }) => {
  const exercises = useStore((state) => state.exerciseMap);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" justify-center   w-full  mb-12">
          {/* <View className=" min-h-[60vh] "> */}
          {/* <Image
            source={{ uri: exercises[exerciseId].gifUrl }}
            className="w-fit h-96"
          /> */}
          {/* </View> */}

          <Text className="text-white text-base font-pmedium justify-center self-center mt-3">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quo
            nisi odio deserunt iure dolores consequuntur officiis placeat eos
            cum architecto nulla odit. Itaque excepturi dignissimos voluptates
            perferendis, nostrum rerum.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseInfo;
