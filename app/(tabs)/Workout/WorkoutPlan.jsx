import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import useStore from "../../../store";

import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { getRoutine, saveRoutine } from "../../../api/exerciseRoutines";
import { Image } from "expo-image";

const WorkoutPlan = () => {
  const { routineId } = useLocalSearchParams();

  const saveRoutines = useStore((state) => state.saveRoutines);

  console.log(saveRoutines);
  console.log(routineId);
  useEffect(() => {
    const routineExists = saveRoutines.some(
      (routine) => routine.title === title,
    );
    console.log(routineExists);
    if (routineExists) {
      setBtnTitle("Saved");
    }
  }, [title, saveRoutines]);

  //console.log(routineId)

  const routines = useStore((state) => state.routineList);
  const exercisesdb = useStore((state) => state.exerciseList);

  const addRoutine = useStore((state) => state.addRoutine);

  const [btntitle, setBtnTitle] = useState("Save Routine");
  const [isLoading, setIsLoading] = useState(false);

  const workout = routines.find((routine) => routine.id === routineId);

  const exercises = workout.exercises.map((id) => ({
    id: id,
    sets: ["1", "2", "3"],
    reps: ["", "", ""],
    weight: ["", "", ""],
  }));

  const title = workout.title;
  console.log(exercises);
  console.log(title);
  const handleSave = async () => {
    if (btntitle === "Save Routine") {
      setIsLoading(true);
      await saveRoutine({ title, exercises });
      setBtnTitle("Saved");
      getRoutine();
      setIsLoading(false);
    }
  };

  const renderExercise = ({ item }) => {
    const exercise = exercisesdb.find((ex) => item === ex.id);

    if (exercise) {
      return (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Workout/ExerciseData",
              params: { exerciseId: `${exercise.id}` },
            })
          }
        >
          <View key={exercise.id} className="flex-row px-4 justify-between ">
            <View className="flex-row gap-2">
              <View className="h-14 bg-white rounded-full w-14 mb-5 overflow-hidden ">
                <Image
                  source={{ uri: exercise.gifUrl }}
                  className="w-14 h-14"
                />
              </View>

              <View className=" justify-start self-center">
                <Text className="text-white "> {exercise.name}</Text>
                <Text className="text-gray-500 ">{workout.sets} sets</Text>
              </View>
            </View>

            <View className="self-center justify-items-center">
              <FontAwesome name="angle-right" size={30} color="grey" />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mt-16 text-white">
          <View className=" px-4 ">
            <View className="border-borderB bg-cardB border p-4 rounded-lg">
              <Text className="text-white text-base  ">{workout.title}</Text>
              <View className="flex-row mt-2 ">
                <Image
                  source={require("../../../assets/l1.png")}
                  className="w-[50px] h-[50px] justify-start "
                  resizeMode="contain"
                />
                <Text className="text-gray-400 self-center text-sm">
                  made by gymleveling
                </Text>
              </View>
              <CustomButton
                title={btntitle}
                handlePress={handleSave}
                containerStyles="mt-7"
                isLoading={isLoading}
              />
            </View>

            <Text className="text-gray-400 m-5">Workout</Text>
          </View>

          <FlatList
            data={workout.exercises}
            renderItem={renderExercise}
            keyExtractor={(item) => item}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutPlan;
