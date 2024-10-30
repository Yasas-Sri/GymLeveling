import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import useStore from "../../../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeightLog from "../../../components/WeightLog";
import { saveLoggedExercises } from "../../../api/exerciseRoutines";

const StartRoutine = () => {
  const { routine_exercises, title, routineId } = useLocalSearchParams();
  const [newexercises, setNewexercises] = useState([]);
  const [finishEnabled, setFinishEnabled] = useState(false);
  const loggedExercises = useStore((state) => state.loggedExercises);

  console.log(loggedExercises);

  useEffect(() => {
    setNewexercises(loggedExercises);
    // console.log(loggedExercises);
  }, [loggedExercises]);

  const updateIsAnyChecked = (checkedStatus) => {
    setFinishEnabled(checkedStatus);
  };

  const exercisesdb = useStore((state) => state.exerciseList);

  const finishRoutine = async () => {
    if (finishEnabled) {
      saveLoggedExercises({ newexercises, routineId });
    } // console.log(routineId);
    // console.log(newexercises);
  };

  const exercises = JSON.parse(routine_exercises);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        {/* <View className=" mt-10"> */}
        {/* <Text className="text-white justify-items-center self-center text-sm font-psemibold mt-2">
            {title}
          </Text> */}
        <View className="justify-between flex-row mt-10">
          {/* <RNButton
          mode="contained-tonal"
          title="Cancel"
          style="rounded  bg-cardB ml-2 min-w-24 border-borderB border-2" 
        //   handlePress={() => setActiveComponent('Preset')}
        /> */}

          <TouchableOpacity>
            <View className=" bg-cardB border-borderB border p-4 rounded-xl ml-2 w-24 ">
              <Text className="text-secondary justify-center self-center">
                Cancel
              </Text>
            </View>
          </TouchableOpacity>

          <Text className="text-white justify-items-center self-center text-sm font-psemibold">
            {title}
          </Text>

          {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}

          <TouchableOpacity onPress={finishRoutine}>
            <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
              <Text className=" justify-center self-center text-white">
                Finish
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className=" mt-5  h-auto mx-2">
          {exercises.map((exercise, index) => (
            // <View key={index} className="flex-row justify-between mb-2">
            //   {/* Assuming each exercise object has properties like 'name', 'reps', 'sets' */}
            //   <Text className="text-white text-lg">
            //     {exercisesdb[exercise.exercise_id_fk].name}
            //   </Text>
            //   <Text className="text-gray-400">
            //     {exercise.reps} reps, {exercise.sets} sets
            //   </Text>
            // </View>
            <View
              key={index}
              className=" justify-between m-2 p-2  rounded-lg border-borderB border bg-cardB"
            >
              <View className="flex-row ">
                <View className="h-14 bg-white rounded-full w-14 mb-5 overflow-hidden ">
                  <Image
                    source={{
                      uri: exercisesdb[exercise.exercise_id_fk].gifUrl,
                    }}
                    className="w-14 h-14"
                  />
                </View>
                <Text className="text-white flex-1 space-y-2  px-4 m-2 font-pmedium">
                  {exercisesdb[exercise.exercise_id_fk].name}
                </Text>
                {/* <TouchableOpacity
                    onPress={() => setModalVisible2(exercise.id)}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity> */}
              </View>

              <WeightLog
                exerciseId={exercise.exercise_id_fk}
                flag={true}
                initialData={exercise}
                onCheckboxChange={updateIsAnyChecked}
              />
            </View>
          ))}
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StartRoutine;
