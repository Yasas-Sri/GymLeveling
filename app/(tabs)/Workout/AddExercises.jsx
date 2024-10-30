import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SelectExerciseSearch from "../../../components/SelectExerciseSearch";

const AddExercises = () => {
  return (
    <View className="bg-primary h-full">
      <View className="justify-between flex-row mt-10">
        <TouchableOpacity>
          <View className=" bg-cardB border-borderB border p-4 rounded-xl ml-2 w-24 ">
            <Text className="text-secondary justify-center self-center">
              Cancel
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="text-white justify-items-center self-center text-sm font-psemibold">
          Add Exercise
        </Text>

        {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}

        <TouchableOpacity>
          <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
            <Text className=" justify-center self-center text-white">Save</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-10">
        <SelectExerciseSearch />
      </View>
    </View>
  );
};

export default AddExercises;
