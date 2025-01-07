import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useStore from "../../../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeightLog from "../../../components/WeightLog";
import {
  saveLoggedExercises,
  updateSavedRoutine,
  getRoutine,
} from "../../../api/exerciseRoutines";
import { getloggedExercises } from "../../../api/exerciseRoutines";

const StartRoutine = () => {
  const { routine_exercises, title, routineId } = useLocalSearchParams();
  const [newexercises, setNewexercises] = useState([]);
  const [finishEnabled, setFinishEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState("false");
  const loggedExercises = useStore((state) => state.loggedExercises);
  const [hasChanges, setHasChanges] = useState(false);
  const [haschecked, setHaschecked] = useState(false);

  // console.log(loggedExercises);

  // useEffect(() => {
  //   setNewexercises((prevExercises) => [
  //     ...prevExercises,
  //     ...loggedExercises.filter(
  //       (exercise) =>
  //         !prevExercises.some(
  //           (e) =>
  //             e.exercise_id_fk === exercise.exercise_id_fk &&
  //             e.sets === exercise.sets &&
  //             e.reps === exercise.reps &&
  //             e.weight === exercise.weight,
  //         ),
  //     ),
  //   ]);
  // }, [loggedExercises]);

  useEffect(() => {
    if (haschecked) {
      // console.log(newexercises);
      setNewexercises(loggedExercises);
    }
    //console.log(loggedExercises);
  }, [loggedExercises, haschecked]);

  const updateIsAnyChecked = (checkedStatus) => {
    setHaschecked(true);
    setFinishEnabled(checkedStatus);
  };

  const exercisesdb = useStore((state) => state.exerciseList);

  const finishRoutine = async () => {
    if (finishEnabled) {
      // console.log(newexercises);
      await saveLoggedExercises({ newexercises, routineId });
      handleExerciseChange(hasChanges);
      // setModalVisible(true);
      const exercise = null;
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      const dateRange = {
        start: thirtyDaysAgo.toISOString().split("T")[0],
        to: currentDate.toISOString().split("T")[0],
      };
      await getloggedExercises({ dateRange, exercise });
      if (!hasChanges) {
        router.replace("/Workout/");
      }
    }
  };

  const handleExerciseChange = (changed) => {
    // console.log("Exercise changed:", changed);
    if (changed) {
      setModalVisible(true);
      //updateSavedRoutine({ newexercises, routineId });
    }
  };

  const updateRoutine = async () => {
    await updateSavedRoutine({ newexercises, routineId });
    setModalVisible(false);
    router.replace("/Workout/");
    // getRoutine();
  };

  const keepRoutine = async () => {
    //await updateSavedRoutine({ newexercises, routineId });
    setModalVisible(false);
    router.replace("/Workout/");
  };

  const exercises = JSON.parse(routine_exercises);
  // console.log(exercises);

  const groupedExercises = exercises.reduce((acc, exercise) => {
    const existingExercise = acc.find(
      (e) => e.exercise_id_fk === exercise.exercise_id_fk,
    );

    if (existingExercise) {
      // Add the current set's reps, weight, and sets to the existing exercise arrays
      existingExercise.sets.push(exercise.sets);
      existingExercise.reps.push(exercise.reps);
      existingExercise.weight.push(exercise.weight);
    } else {
      // Create a new entry for this exercise
      acc.push({
        exercise_id_fk: exercise.exercise_id_fk,
        sets: [exercise.sets],
        reps: [exercise.reps],
        weight: [exercise.weight],
      });
    }
    return acc;
  }, []);

  // console.log(groupedExercises);

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
        {/* <View className=" mt-5  h-auto mx-2">
          {exercises.map((exercise, index) => (
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
              </View>

              <WeightLog
                exerciseId={exercise.exercise_id_fk}
                flag={true}
                initialData={exercises}
                onCheckboxChange={updateIsAnyChecked}
                onExerciseChange={finishRoutine}
              />
            </View>
          ))}
        </View> */}
        <View className="mt-5 h-auto mx-2">
          {groupedExercises.map((exercise, index) => (
            <View
              key={exercise.exercise_id_fk}
              className="justify-between m-2 p-2 rounded-lg border border-borderB bg-cardB"
            >
              <View className="flex-row items-center">
                <View className="h-14 bg-white rounded-full w-14 mb-5 overflow-hidden">
                  <Image
                    source={{
                      uri: exercisesdb[exercise.exercise_id_fk].gifUrl,
                    }}
                    className="w-14 h-14"
                  />
                </View>
                <Text className="text-white flex-1 space-y-2 px-4 m-2 font-pmedium">
                  {exercisesdb[exercise.exercise_id_fk].name}
                </Text>
              </View>

              <WeightLog
                exerciseId={exercise.exercise_id_fk}
                flag={true}
                initialData={{
                  reps: exercise.reps,
                  weight: exercise.weight,
                  sets: exercise.sets,
                }}
                onCheckboxChange={updateIsAnyChecked}
                //onExerciseChange={finishRoutine}
                setHasChanges={setHasChanges}
              />
            </View>
          ))}
        </View>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible("false")}>
            <View style={styles.modalContainer2}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent2}>
                  <View>
                    <Text>Update {title}</Text>
                    <Text>You have changed the routine</Text>
                  </View>
                  <View className="mb-2     w-full   ">
                    <Button
                      title="Update Routine"
                      color="#0f0f36"
                      onPress={updateRoutine}
                    />
                    <Button
                      title="Keep Original Routine"
                      color="#0f0f36"
                      onPress={keepRoutine}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StartRoutine;

const styles = StyleSheet.create({
  modalContainer2: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent2: {
    // width: 300,
    width: "100%",
    padding: 20,

    backgroundColor: "white",
    //borderRadius: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
