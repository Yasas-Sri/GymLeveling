import React, { useEffect, useState, useCallback } from "react";
import useStore from "../../../store";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { getUsers } from "../../../api/trainer";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import { Searchbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../../lib/supabase";
//import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Users = () => {
  // useEffect(() => {
  //   const fetchusers = async () => {
  //     await getUsers();
  //   };
  //   fetchusers();
  //   //fetchProfilePhotos();
  // }, []);

  const users = useStore((state) => state.users);
  const [Users, setUsers] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [filteredData, setFilteredData] = useState(users);
  // const [userPhotos, setUserPhotos] = useState({});
  console.log("userId in index", users);
  // console.log("filtered data", filteredData);

  // useEffect(() => {
  //   setUsers(users);
  //   console.log("Users updated:", users);
  //   setFilteredData(Users);
  // }, [Users]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        const filtered = users.filter((item) =>
          item.userName.toLowerCase().includes(query.toLowerCase()),
        );
        console.log("Filtered data:", filtered);
        setFilteredData(filtered);
      } else {
        setFilteredData(users);
      }
    }, 300),
    [users],
  );

  const renderItem = ({ item }) => {
    console.log("userid in renderitem", item.userId);
    console.log("username in renderitem", item.userName);
    //bg-cardB border-borderB border p-4 rounded-2xl mt-5 mb-5 w-1/3 ml-4
    // const profilePhoto = userPhotos[item.userId] || null;
    const firstLetter = item.userName.trim().charAt(0).toUpperCase();
    return (
      <View className="p-1 ">
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setUserId(item.userId);
            setUserName(item.userName);
          }}
        >
          {/* <View className=" justify-between">
            <View className="flex-row gap-x-2">
              <View className="flex-1">
                <Text className="text-white text-base ">{item.userName}</Text>
              </View>
            </View>
          </View> */}

          <View className="p-1">
            <View className="justify-between flex-row">
              <View className="flex-row">
                <View className="h-14 bg-secondaryLight rounded-full w-14 m-1 overflow-hidden  ">
                  <Text className="text-center justify-center items-center text-2xl p-1">
                    {firstLetter}
                  </Text>
                </View>

                <Text className="my-0.5 rounded border-slate-600 border-solid text-white py-2 px-4 font-pregular text-base capitalize self-center">
                  {item.userName}
                </Text>
                {/* <Text>{target}</Text> */}
              </View>
              <View className="  self-center justify-items-center m-2">
                <FontAwesome name="angle-right" size={30} color="grey" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View className=" bg-primary h-full">
      <Text className="text-gray-500 text-center mb-5 text-base">Members</Text>

      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        className="mx-7 mb-3.5 bg-lightB  border-borderB border  "
        inputStyle={{ color: "white" }}
      />
      <FlatList
        data={filteredData}
        // keyExtractor={(item, index) =>
        //   item.id ? item.id.toString() : index.toString()
        // }
        // keyExtractor={(item) => item.userId}
        //keyExtractor={(item) => item.userId}
        renderItem={renderItem}
        // scrollEnabled={false}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* <View className="mb-2 mt-1">
                    <Button
                      title="Create a workout plan"
                      color="#FF7E06"
                      onPress={() => {
                        router.push({
                          pathname: "/users/workoutPlan",
                          params: { userId: `${userId}` },
                        });
                        setModalVisible(false);
                      }}
                    />
                  </View> */}

                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/users/workoutPlan",
                      params: { userId: `${userId}` },
                    });
                    setModalVisible(false);
                  }}
                >
                  <View className=" bg-secondaryLight  border mb-4 w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                    <Text className="  text-white  font-psemibold text-base">
                      Create a workout plan
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/users/nutritionPlan",
                      params: { userId: `${userId}` },
                    });
                    setModalVisible(false);
                  }}
                >
                  <View className=" bg-black  border mb-2  w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                    <Text className="  text-white  font-psemibold text-base">
                      Create a nutrition plan
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/users/progress",
                      params: {
                        userId: `${userId}`,
                        userName: `${userName}`,
                      },
                    });
                    setModalVisible(false);
                  }}
                >
                  <View className=" bg-secondaryLight  border mb-2  w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                    <Text className="  text-white  font-psemibold text-base">
                      Track member progress
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
// store ends

export default Users;

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
});
