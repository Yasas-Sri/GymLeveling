import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import CustomIconButton from "../../components/CustomIconButton";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { getSchedule } from "../../api/saveBooking";
import useStore from "../../store";
import { supabase } from "../../lib/supabase";
import ImageItem from "../../components/ImageItem";
import { useAuth } from "../../context/AuthContext";
import WithRole from "../../components/WithRole";
import { getUsers } from "../../api/trainer";

const { width } = Dimensions.get("window");
const filterActivities = (activities) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const todaysActivities = [];
  const upcomingActivities = [];
  activities.forEach((activity) => {
    if (activity.booked_date === today) {
      todaysActivities.push(activity);
    } else if (new Date(activity.booked_date) > new Date(today)) {
      upcomingActivities.push(activity);
    }
  });

  return { todaysActivities, upcomingActivities };
};

const Index = () => {
  const [files, setFiles] = useState([]);
  const saveBookings = useStore((state) => state.saveBookings);
  const { addUserSession } = useStore.getState();
  const [User, setUser] = useState({});
  const { addImage } = useStore.getState();
  const imageFiles = useStore((state) => state.imageFiles);
  const { authState, Role } = useAuth();

  // console.log("homeRole", Role);
  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    console.log("home Auth state changed:", authState);
  }, [authState]);

  useEffect(() => {
    const fetchusers = async () => {
      await getUsers();
    };
    fetchusers();
    //fetchProfilePhotos();
  }, []);

  // const getUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   //console.log(user);
  //   return user;
  // };
  // const user = getUser();
  // console.log(user);

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
      addUserSession(user);
      // console.log(user.id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loadDP = async () => {
      // const {data: { user },  } = await supabase.auth.getUser();
      //console.log(user);
      const { data } = await supabase.storage.from("images").list(User.id);
      // console.log(data);
      if (data) {
        setFiles(data);
        await addImage(data);
      }
      // console.log(files);
    };
    loadDP();
  }, [User.id, addImage]);

  //console.log(imageFiles);

  const { todaysActivities, upcomingActivities } =
    filterActivities(saveBookings);
  // console.log(upcomingActivities);
  const renderItem = ({ item }) => {
    //console.log(item.id);
    return (
      <View className=" bg-cardB border-borderB border p-4 rounded-2xl mt-1 mb-5 w-full ">
        <View className=" justify-between">
          <View className="flex-row gap-x-2">
            <View className="flex-1">
              <Text className="text-white text-base ">{item.booked_date}</Text>
            </View>

            {/* <View className="flex-row-reverse gap-20">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true);
                  setId(item.id);
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View className="flex-row gap-5">
            <View className="flex-row ">
              <Text className="text-white text-base font-pmedium ">
                {item.event} -{" "}
              </Text>
              <Text className="text-white text-base font-pmedium">
                {item.booked_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderTodayItem = ({ item }) => {
    //console.log(item.id);
    return (
      <View className="">
        <View className=" justify-between">
          <View className="flex-row gap-x-2">
            <View className="flex-1">
              <Text className="text-white text-base ">{item.booked_date}</Text>
            </View>

            {/* <View className="flex-row-reverse gap-20">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true);
                  setId(item.id);
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View> */}
          </View>
          <View className="flex-row gap-5">
            <View className="flex-row ">
              <Text className="text-white text-base font-pmedium ">
                {item.event} -{" "}
              </Text>
              <Text className="text-white text-base font-pmedium">
                {item.booked_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" min-h-[75vh]">
          <View my-6 px-4 space-y-6>
            <View className="justify-between flex-row mt-2 mx-3">
              <View className="">
                <Text className="text-white mt-6 mx-4">Welcome </Text>
                <Text className="text-white mt-2 mx-4">Name </Text>
              </View>

              <View className="mt-6">
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
              </View>
            </View>
          </View>

          {/* <CustomCard
            title="Today's activites"
            containerStyles="min-w-2 mx-4 my-4 border-2 border-borderB text-white"
            color="bg-cardB "
            style="text-white"
          /> */}
          <WithRole role="Member">
            {todaysActivities && (
              <View style={styles.card}>
                <View className="flex-row justify-start">
                  <Text className="text-white text-base justify-center">
                    Today Activities
                  </Text>
                  <FlatList
                    data={todaysActivities}
                    // keyExtractor={(item, index) =>
                    //   item.id ? item.id.toString() : index.toString()
                    // }
                    //keyExtractor={(item) => item.id}
                    renderItem={renderTodayItem}
                    scrollEnabled={false}
                  />
                </View>
              </View>
            )}

            {!todaysActivities && (
              <View style={styles.card}>
                <View className="flex-row justify-start">
                  <Text className="text-white text-base justify-center">
                    Today Activities
                  </Text>
                </View>
              </View>
            )}

            {upcomingActivities && (
              <FlatList
                data={upcomingActivities}
                // keyExtractor={(item, index) =>
                //   item.id ? item.id.toString() : index.toString()
                // }
                //keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
          </WithRole>
          <WithRole role="Trainer">
            <View style={styles.card1}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/users",
                  })
                }
              >
                <Text className="text-white text-base p-2 justify-center text-center self-center">
                  Users
                </Text>
              </TouchableOpacity>
            </View>
          </WithRole>

          <WithRole role="Member">
            <Text className="text-white text-2xl">Only visible for users</Text>
          </WithRole>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9, // Slightly less than full width for padding
    alignSelf: "center", // Centers the card
    backgroundColor: "#0f0f36",
    borderColor: "#363670",
    borderRadius: 16, // Rounded corners
    borderWidth: 1,
    padding: 16,
    elevation: 4, // Shadow for Android
    //shadowColor: "#000", // Shadow for iOS
    //shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 8, // Shadow for iOS
    marginVertical: 16, // Spacing around the card
  },

  card1: {
    width: width * 0.5, // Slightly less than full width for padding
    alignSelf: "flex-start", // Centers the card
    backgroundColor: "#0f0f36",
    borderColor: "#363670",
    borderRadius: 16, // Rounded corners
    borderWidth: 1,
    padding: 16,
    elevation: 4, // Shadow for Android
    //shadowColor: "#000", // Shadow for iOS
    //shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 8, // Shadow for iOS
    marginVertical: 20, // Spacing around the card
    marginHorizontal: 20,
  },
});
