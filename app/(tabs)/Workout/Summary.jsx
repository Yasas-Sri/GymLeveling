import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getEachloggedExercise } from "../../../api/exerciseRoutines";
import useStore from "../../../store";
import Linechart from "../../../components/LineChart";
import Barchart from "../../../components/Barchart";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
const Summary = ({ exercise }) => {
  const fetchloggedEachExercise = useStore(
    (state) => state.fetchloggedEachExercise,
  );
  const exercises = useStore((state) => state.exerciseMap);
  //const { exercise } = useLocalSearchParams();
  const [trackbtn, setTrackbtn] = useState("reps"); // set reps or volume
  const [flag, setFlag] = useState(0);
  const [modalVisible, setModalVisible] = useState("false");
  const [title, setTitle] = useState("Last 7 days");
  const [interval, setInterval] = useState("7days");
  useEffect(() => {
    // const exercise = null;
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    const dateRange = {
      start: thirtyDaysAgo.toISOString().split("T")[0],
      to: currentDate.toISOString(),
    };
    getEachloggedExercise({ dateRange, exercise });
  }, [exercise]);
  const volumebtn = () => {
    setFlag(1);
    setTrackbtn("volume");
  };

  const repsbtn = () => {
    setFlag(0);
    setTrackbtn("reps");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" min-h-[85vh]">
          <View className="ml-0">
            {/* {interval === "7days" && (
          <Barchart data={fetchloggedExercises} flag={flag} />
        )} */}
            <Text className="text-white text-base font-pmedium justify-center self-center mt-3">
              {" "}
              {exercises[exercise].name}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                //setroutineId(item.id);
              }}
            >
              <View className="flex-row-reverse mr-5 mt-2">
                <View className="flex-row gap-2">
                  <Text className="text-white text-lg font-psemibold">
                    {title}
                  </Text>
                  <View className="justify-center">
                    <FontAwesome5 name="angle-down" size={15} color="white" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {interval === "7days" && (
              <Barchart data={fetchloggedEachExercise} flag={flag} />
            )}
            {interval === "30days" && (
              <Linechart data={fetchloggedEachExercise} flag={flag} />
            )}

            <View className="flex-row-reverse">
              <TouchableOpacity onPress={volumebtn}>
                <View
                  className={`p-4   m-2 w-fit mr-2 justify-center border-borderB border rounded-lg ${trackbtn === "volume" ? "bg-secondary" : "bg-lightB"}`}
                >
                  <Text className="space-y-2   text-white text-base">
                    Volume
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={repsbtn}>
                <View
                  className={`p-4   m-2 w-fit mr-2 justify-center  border-borderB border rounded-lg ${trackbtn === "reps" ? "bg-secondary" : "bg-lightB"}`}
                >
                  <Text className="space-y-2   text-white text-base">Reps</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-white m-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quo
            nisi odio deserunt iure dolores consequuntur officiis placeat eos
            cum architecto nulla odit. Itaque excepturi dignissimos voluptates
            perferendis, nostrum rerum.
          </Text>
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible("false")}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View className="m-2     w-full   ">
                    <View className="flex-col ">
                      <Button
                        title="Last 7 days"
                        color="#0f0f36"
                        onPress={() => {
                          setInterval("7days");
                          setTitle("Last 7 days");
                          setModalVisible("false");
                        }}
                        //disabled={isPressed1}
                        //className={isLoading ? "opacity-50" : "#0f0f36"}
                      />
                      <Button
                        title="Last 30 days"
                        color="#0f0f36"
                        onPress={async () => {
                          setInterval("30days");
                          await setTitle("Last 30 days");
                          setModalVisible("false");
                        }}
                        //disabled={isPressed2}
                        //className={isLoading ? "opacity-50" : "#0f0f36"}
                      />
                    </View>
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

export default Summary;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent: {
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
