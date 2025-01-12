import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SelectExerciseSearch from "../../../components/SelectExerciseSearch";
import useStore from "../../../store";
import { router } from "expo-router";

const AddExercises = () => {
  const { clearAllExercises } = useStore();
  const { addExerciseDetails } = useStore();
  const [selectedExercises, setSelectedExercises] = useState([]);

  // const handleSave = () => {
  //   selectedExercises.forEach((exerciseID) => {
  //     addExerciseDetails(exerciseID, { sets: 0, reps: 0, weight: 0 });
  //   });
  //   router.push("/Workout/NewRoutine");
  // };
  const handleSave = () => {
    selectedExercises.forEach((exerciseID) => {
      addExerciseDetails(exerciseID, {
        sets: ["0"],
        reps: ["0"],
        weights: ["0"],
      });
    });
    //router.push("/users/workoutPlan");
    router.push({
      pathname: "/Workout/NewRoutine",
    });
  };
  return (
    <View className="bg-primary h-full">
      <View className="justify-between flex-row mt-10">
        <TouchableOpacity
          onPress={() => {
            clearAllExercises();
            router.push("/Workout/NewRoutine");
          }}
        >
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

        <TouchableOpacity onPress={handleSave}>
          <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
            <Text className=" justify-center self-center text-white">Save</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-10">
        <SelectExerciseSearch onSaveExercises={setSelectedExercises} />
      </View>
    </View>
  );
};

export default AddExercises;
