import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
//import RNButton from '../../../components/RNButton'
import CustomButton from "../../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeightLog from "../../../components/WeightLog";
import { router } from "expo-router";
import { getRoutine, saveRoutine } from "../../../api/exerciseRoutines";
import useStore from "../../../store";
import { useLocalSearchParams } from "expo-router";
import { saveWorkoutPlan } from "../../../api/trainer";

const NewRoutine = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(-1);
  const [modalVisible3, setModalVisible3] = useState(false); // modal for message after succesfully adding new routine
  const [modalVisible4, setModalVisible4] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("Untitled trainer");
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useLocalSearchParams();

  const { addExerciseDetails, removeExercise } = useStore();
  const exercisesdb = useStore((state) => state.exerciseMap);
  const addedExercises = useStore((state) => state.addedExercises);
  const { clearAllExercises } = useStore();

  console.log("memberID", userId);

  useEffect(() => {
    setExercises(addedExercises);
  }, [addedExercises]);

  const addExercises = () => {
    //setModalVisible(true);S
    //router.push("/users/addExercises");
    router.push({
      pathname: "/users/addExercises",
      params: { userId: `${userId}` },
    });
  };

  const deleteExercise = (index) => {
    setExercises((prevExercises) =>
      prevExercises.filter((_, i) => i !== index),
    );
    removeExercise(index);
    setModalVisible2(-1);
  };

  const cancelRoutine = () => {
    setModalVisible1(true);
  };

  const saveRoutines = async () => {
    if (
      !exercises ||
      exercises.length === 0 ||
      !exercises.some((exercise) => exercise.id)
    ) {
      setModalVisible4(true);
    } else {
      setIsLoading(true);
      await saveWorkoutPlan({ title, exercises, userId });
      setIsLoading(false);
      clearAllExercises();
      setModalVisible3(true);
      console.log("member id in saveroutines in workoutplan", userId);
      console.log("exercises in func", exercises);
    }
  };

  const discardRoutine = () => {
    clearAllExercises();
    router.push("/users/");
  };
  //console.log(exercises);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-between flex-row mt-10">
          {/* <RNButton
            mode="contained-tonal"
            title="Cancel"
            style="rounded  bg-cardB ml-2 min-w-24 border-borderB border-2" 
          //   handlePress={() => setActiveComponent('Preset')}
          /> */}

          <TouchableOpacity onPress={cancelRoutine}>
            <View className=" bg-cardB border-borderB border p-4 rounded-xl ml-2 w-24 ">
              <Text className="text-secondary justify-center self-center">
                Cancel
              </Text>
            </View>
          </TouchableOpacity>

          <Text className="text-white justify-items-center self-center text-sm font-psemibold">
            Create routine
          </Text>

          {/* <RNButton
            mode="contained-tonal"
            title="Save"
            style="rounded  bg-secondary mr-2 min-w-24" 
           //S handlePress={() => setActiveComponent('Exercises')}
          /> */}

          <TouchableOpacity onPress={saveRoutines}>
            <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className=" justify-center self-center text-white">
                  Save
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View className=" space-y-2 mt-7 w-full  px-4 ">
          <View className="flex-row justify-start">
            <TextInput
              className="flex-1 text-white text-base font-psemibold bg-primary"
              placeholder="Routine title"
              placeholderTextColor="#808080"
              onChangeText={setTitle}
            />
            <MaterialCommunityIcons name="lead-pencil" size={30} color="grey" />
          </View>
        </View>

        {!exercises.length && (
          <View className=" mt-10  h-64 mx-2">
            <Text className="text-gray-500 self-center p-10 m-4">
              Add Exercises to make your routine
            </Text>

            <View className="self-center">
              <MaterialCommunityIcons name="dumbbell" size={100} color="grey" />
            </View>
          </View>
        )}

        {exercises && (
          <View className=" mt-5  h-auto mx-2">
            {exercises.map((exercise, index) => (
              <View
                key={index}
                className=" justify-between m-2 p-2  rounded-lg border-borderB border bg-cardB"
              >
                <View className="flex-row ">
                  <View className="h-14 bg-white rounded-full w-14 mb-5 overflow-hidden ">
                    <Image
                      source={{ uri: exercisesdb[exercise.id].gifUrl }}
                      className="w-14 h-14"
                    />
                  </View>
                  <Text className="text-white flex-1 space-y-2  px-4 m-2 font-pmedium">
                    {exercisesdb[exercise.id].name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible2(exercise.id)}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>

                <WeightLog exerciseId={exercise.id} flag={false} />
              </View>
            ))}
          </View>
        )}

        <View className="space-y-2  mt-0  mb-10 w-full  px-4 ">
          <CustomButton
            title="Add Exercise"
            handlePress={addExercises}
            containerStyles="mt-7"
          />
        </View>

        {/* Modal adding exercises */}
        {/* <Modal visible={modalVisible} transparent={true} animationType="slide">
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <TextInput
                      //className="flex-1 text-primary text-base font-psemibold  focus:border-orange-400  h-40 p-10,"
                      value={inputText}
                      placeholder="Exercise"
                      placeholderTextColor="#808080"
                      onChangeText={setInputText}
                      style={styles.input}
                    />
  
                    <View className="mb-2 ">
                      <Button title="+" color="#0f0f36" onPress={saveExercise} />
                    </View>
                    <View className="mb-2 ">
                      <Button
                        title="-"
                        color="#FF7E06"
                        onPress={() => setModalVisible(false)}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal> */}

        {/* modal for discard the routine           */}
        <Modal visible={modalVisible1} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible1(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text className="font-pregular">
                    Are you sure you want to discard the routine
                  </Text>

                  <View className="mb-2 ">
                    <Button
                      title="Discard Routine"
                      color="#FF7E06"
                      onPress={discardRoutine}
                    />
                  </View>
                  <View className="mb-2 ">
                    <Button
                      title="Cancel"
                      color="#0f0f36"
                      onPress={() => setModalVisible1(false)}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* modal for deleting exercise */}
        <Modal
          visible={modalVisible2 >= 0}
          transparent={true}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible2(-1)}>
            <View style={styles.modalContainer2}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent2}>
                  <View className="mb-2  w-full   ">
                    <Button
                      title="Delete Exercise"
                      color="#0f0f36"
                      onPress={() => deleteExercise(modalVisible2)}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* modal for after adding a new routine success message */}
        <Modal visible={modalVisible3} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible3(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text className="font-pregular text-white mb-5">
                    Successfully added the routine
                  </Text>

                  {/* <View className="mb-2 ">
                    <Button
                      title="Ok"
                      color="#FF7E06"
                      onPress={() => router.replace("/users/")}
                    />
                  </View> */}

                  <TouchableOpacity onPress={() => router.replace("/users/")}>
                    <View className=" bg-secondaryLight border-secondaryLight border mb-2  w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                      <Text className="  text-white  font-psemibold text-base">
                        Ok
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* modal for not pressing save without saving any exercises*/}
        <Modal visible={modalVisible4} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible4(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text className="font-pregular text-white mb-5 text-center">
                    Add at least one exercise
                  </Text>

                  {/* <View className="mb-2  ">
                            <Button
                              title="Ok"
                              color="#FF7E06"
                              onPress={() => setModalVisible3(false)}
                            />
                          </View> */}

                  <TouchableOpacity onPress={() => setModalVisible4(false)}>
                    <View className=" bg-secondaryLight border-secondaryLight border mb-2  w-fit p-2 rounded-xl min-h-[50px]  justify-center items-center">
                      <Text className="  text-white  font-psemibold text-base">
                        Ok
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewRoutine;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: 300,
    padding: 20,

    backgroundColor: "rgba(15, 15, 54,0.8)",
    borderRadius: 20,
    borderColor: "#363670",
    borderWidth: 1,
  },

  input: {
    height: 40,
    borderColor: "#363670",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },

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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
