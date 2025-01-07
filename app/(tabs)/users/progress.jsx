import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Barchart from "../../../components/Barchart";
import { router } from "expo-router";
import { getuserloggedExercises } from "../../../api/trainer";
import useStore from "../../../store";
import Linechart from "../../../components/LineChart";
import { supabase } from "../../../lib/supabase";
import ImageItem from "../../../components/ImageItem";
import { useAuth } from "../../../context/AuthContext";
import { useLocalSearchParams } from "expo-router";
const Progress = () => {
  const [trackbtn, setTrackbtn] = useState("reps"); // set reps or volume
  const [flag, setFlag] = useState(0);
  const [modalVisible, setModalVisible] = useState("false");
  const [interval, setInterval] = useState("7days");
  const [title, setTitle] = useState("Last 7 days");
  const [files, setFiles] = useState([]);
  const [User, setUser] = useState({});
  const { onLogin, authState } = useAuth();
  const { userId, userName } = useLocalSearchParams();

  console.log("name", userName);
  useEffect(() => {
    console.log("Auth state changed:", authState);
  }, [authState]);

  const usersfetchloggedexercise = useStore(
    (state) => state.usersfetchloggedexercise,
  );
  const imageFiles = useStore((state) => state.imageFiles);
  // console.log(fetchloggedExercises);
  useEffect(() => {
    const exercise = null;
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    const dateRange = {
      start: thirtyDaysAgo.toISOString().split("T")[0],
      to: currentDate.toISOString(),
    };
    getuserloggedExercises({ dateRange, exercise, userId });
  }, [userId]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(user);
    return user;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
      // console.log(user.id);
    };

    fetchUser();
  }, []);

  // // useEffect(() => {}, []);

  // useEffect(() => {
  //   const loadDP = async () => {
  //     // const {data: { user },  } = await supabase.auth.getUser();
  //     //console.log(user);
  //     const { data } = await supabase.storage.from("images").list(User.id);
  //     // console.log(data);
  //     if (data) {
  //       setFiles(data);
  //     }
  //     console.log(files);
  //   };
  //   loadDP();
  // }, [User.id]);

  const volumebtn = () => {
    setFlag(1);
    setTrackbtn("volume");
  };

  const repsbtn = () => {
    setFlag(0);
    setTrackbtn("reps");
  };

  const isPressed1 = () => {
    if (interval === "7days") {
      return false;
    }
  };

  const isPressed2 = () => {
    if (interval === "30days") {
      return false;
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" flex-row  gap-4  items-center mt-2 mx-2  px-4">
          <View>
            <Text className="text-white text-2xl font-bold ">{userName}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            //setroutineId(item.id);
          }}
        >
          <View className="flex-row-reverse mr-5">
            <View className="flex-row gap-2">
              <Text className="text-white text-lg font-psemibold">{title}</Text>
              <View className="justify-center">
                <FontAwesome5 name="angle-down" size={15} color="white" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View className="ml-0">
          {interval === "7days" && (
            <Barchart data={usersfetchloggedexercise} flag={flag} />
          )}
          {interval === "30days" && (
            <Linechart data={usersfetchloggedexercise} flag={flag} />
          )}

          <View className="flex-row-reverse">
            <TouchableOpacity onPress={volumebtn}>
              <View
                className={`p-4   m-2 w-fit mr-2 justify-center border-borderB border rounded-lg ${trackbtn === "volume" ? "bg-secondary" : "bg-lightB"}`}
              >
                <Text className="space-y-2   text-white text-base">Volume</Text>
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
                        onPress={() => {
                          setInterval("30days");
                          setTitle("Last 30 days");
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

export default Progress;

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
