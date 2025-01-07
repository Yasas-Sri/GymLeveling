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
import { getloggedExercises } from "../../../api/exerciseRoutines";
import useStore from "../../../store";
import Linechart from "../../../components/LineChart";
import { supabase } from "../../../lib/supabase";
import ImageItem from "../../../components/ImageItem";
import { useAuth } from "../../../context/AuthContext";
import WithRole from "../../../components/WithRole";
const Profile = () => {
  const [trackbtn, setTrackbtn] = useState("reps"); // set reps or volume
  const [flag, setFlag] = useState(0);
  const [modalVisible, setModalVisible] = useState("false");
  const [interval, setInterval] = useState("7days");
  const [title, setTitle] = useState("Last 7 days");
  const [files, setFiles] = useState([]);
  const [User, setUser] = useState({});
  const { onLogin, authState } = useAuth();

  useEffect(() => {
    console.log("Auth state changed:", authState);
  }, [authState]);

  const fetchloggedExercises = useStore((state) => state.fetchloggedExercises);
  const imageFiles = useStore((state) => state.imageFiles);
   console.log(fetchloggedExercises);
  useEffect(() => {
    const exercise = null;
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    const dateRange = {
      start: thirtyDaysAgo.toISOString().split("T")[0],
      to: currentDate.toISOString(),
    };
    getloggedExercises({ dateRange, exercise });
  }, []);

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
        {/* margin not the same   */}
        <View className="justify-between flex-row mt-2">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Profile/EditProfile",
              })
            }
          >
            <View className="  p-4  ml-2 min-w-20 justify-center self-center ">
              <Text className="text-secondary  text-base">Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <Text className="text-white justify-items-center  self-center  font-pextrabold text-base  "></Text>

          {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/Profile/Settings",
              })
            }
          >
            <View className="   p-4  mr-2  self-center justify-items-center">
              {/* <Text className=" justify-center  text-white self-center">Save</Text>       */}
              <MaterialIcons name="settings" size={30} color="grey" />
            </View>
          </TouchableOpacity>
        </View>

        <View className=" flex-row  gap-4  items-center mt-2 mx-2  px-4">
          {/* <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            className="w-24 h-24 rounded-full border-4 border-white -mt-0"
          /> */}
          {Array.isArray(imageFiles) && imageFiles.length === 1 ? (
            <ImageItem
              key={imageFiles[0].id}
              item={imageFiles[0]}
              userId={User.id}
            />
          ) : (
            imageFiles.map((item) => (
              <ImageItem key={item.id} item={item} userId={User.id} />
            ))
          )}

          <View>
            <Text className="text-white text-2xl font-bold ">
              Lan Mandragoran{" "}
            </Text>

            <Text className="text-white mt-1">workouts</Text>
          </View>
        </View>

        <WithRole role="Member">
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              //setroutineId(item.id);
            }}
          >
            <View className="flex-row-reverse mr-5">
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
          <View className="ml-0">
            {interval === "7days" && (
              <Barchart data={fetchloggedExercises} flag={flag} />
            )}
            {interval === "30days" && (
              <Linechart data={fetchloggedExercises} flag={flag} />
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

          <View className="p-4  ml-2 mt-7 w-fit mr-2 justify-center ">
            <Text className="space-y-2   text-white font-pregular text-lg">
              Workout Details
            </Text>
          </View>

          {/* render the workouts that done and logged */}
          <TouchableOpacity>
            <View className="p-4  ml-2 m-2 w-fit mr-2 justify-center border-borderB border rounded-lg">
              <Text className="space-y-2   text-white text-base">
                Routine title
              </Text>
              <Text className="text-white">Date</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="p-4  ml-2 mt-2 w-fit mr-2 justify-between flex-row ">
              <View className="flex-row gap-2">
                <MaterialIcons name="work-history" size={30} color="white" />
                <Text className="space-y-2   text-white text-base font-pmedium self-center">
                  Workout History
                </Text>
              </View>

              <View className="  self-center justify-items-center">
                <FontAwesome name="angle-right" size={30} color="grey" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="p-4  ml-2  w-fit mr-2  justify-between  flex-row">
              <View className="flex-row gap-2">
                <MaterialCommunityIcons
                  name="food-apple"
                  size={30}
                  color="white"
                />
                <Text className="space-y-2   text-white text-base font-pmedium self-center">
                  Nutrition
                </Text>
              </View>

              <View className="  self-center justify-items-center">
                <FontAwesome name="angle-right" size={30} color="grey" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/Profile/measurements")}
          >
            <View className="p-4  ml-2  w-fit mr-2  justify-between  flex-row">
              <View className="flex-row gap-2">
                <MaterialCommunityIcons name="human" size={30} color="white" />
                <Text className="space-y-2   text-white text-base font-pmedium self-center">
                  measurements
                </Text>
              </View>

              <View className="  self-center justify-items-center">
                <FontAwesome name="angle-right" size={30} color="grey" />
              </View>
            </View>
          </TouchableOpacity>

          {/* <View className="space-y-4">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between p-4 border border-borderB rounded-lg bg-lightB"
             // onPress={() => alert(`Navigate to ${item.title}`)}
            >
              <View className="flex-row items-center">
                <Image source={item.icon} className="w-8 h-8 mr-4" />
                <Text className="text-white text-lg">{item.title}</Text>
              </View>
              <Text className="text-black text-lg">&gt;</Text>
            </Pressable>
          ))}
        </View> */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
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
        </WithRole>

        <WithRole role="Trainer">
          <View className="self-center m-8 p-5">
            <MaterialCommunityIcons name="dumbbell" size={200} color="grey" />
          </View>
        </WithRole>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
