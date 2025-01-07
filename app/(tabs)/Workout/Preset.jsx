import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useFocusEffect, useCallback } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

//import { s, vs, ms } from 'react-native-size-matters';
import useStore from "../../../store";
import CustomButton from "../../../components/CustomButton";
import { getRoutine, deleteRoutine } from "../../../api/exerciseRoutines";

const Preset = () => {
  const saveRoutines = useStore((state) => state.saveRoutines);
  const routineData = useStore((state) => state.routineList);
  const [modalVisible, setModalVisible] = useState("false"); // delete routines
  const [routineId, setroutineId] = useState();
  // const { addRoutine } = useStore.getState();
  const [isLoading, setIsLoading] = useState(false);
  const addRoutine = useStore((state) => state.addRoutine);

  console.log(saveRoutines);

  //const routineStart = ({ item }) => {};

  const deleteroutines = async ({ routineId }) => {
    setIsLoading(true);
    await deleteRoutine({ routineId });
    // const callbacks = {
    //   onSuccess: getRoutine(addRoutine),
    // };
    await getRoutine();
    //addRoutine([]);
    setModalVisible(false);
    setIsLoading(false);
  };

  const renderItem = ({ item }) => {
    //console.log(item.id);
    return (
      <View className=" pb-3">
        <View className=" bg-cardB border-borderB border p-4 rounded-lg mb-10 w-full">
          <View className="justify-between flex-row">
            <View className="flex-row gap-x-2">
              <Text className="text-white text-lg ">{item.title}</Text>
              {/* <Text className="text-white text-lg ">
              {item.routine_exercises}
            </Text> */}
              <MaterialCommunityIcons name="dumbbell" size={30} color="grey" />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setroutineId(item.id);
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <CustomButton
            title="Start Routine"
            handlePress={() =>
              router.push({
                pathname: "/Workout/StartRoutine",
                params: {
                  routine_exercises: JSON.stringify(item.routine_exercises), //`${item.routine_exercises}`,
                  title: `${item.title}`,
                  routineId: `${item.id}`,
                },
              })
            }
            containerStyles="mt-7"
            //isLoading={loading}
          />
        </View>
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
                // keyExtractor={(item, index) =>
                //   item.id ? item.id.toString() : index.toString()
                // }
                //keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible("false")}>
            <View style={styles.modalContainer2}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent2}>
                  {/* <View className="mb-2     w-full   ">
                    <Button
                      title="Delete Routine"
                      color="#0f0f36"
                      onPress={() => deleteroutines({ routineId })}
                      disabled={isLoading}
                      className={isLoading ? "orange" : "blue"}
                    />
                  </View> */}

                  <TouchableOpacity
                    onPress={() => deleteroutines({ routineId })}
                  >
                    <View className=" bg-black border-borderB border mb-2  min-w-full p-2 rounded-xl min-h-[50px]  justify-center items-center">
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#FF7E06" />
                      ) : (
                        <Text className="  text-white  font-psemibold text-base">
                          Delete Routine
                        </Text>
                      )}
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

export default Preset;

const styles = StyleSheet.create({
  modalContainer2: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", //#0f0f36 rgba(0, 0, 0, 0.5)
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent2: {
    // width: 300,
    width: "100%",
    padding: 20,

    backgroundColor: "rgba(15, 15, 54,0.8)", //15, 15, 54
    //borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#363670",
    borderWidth: 1,
  },
});
