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
import React, { useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { Link, router } from "expo-router";

const Settings = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const { onLogout } = useAuth();

  const logout = async () => {
    await onLogout();
    setModalVisible1(false);
    router.replace("../../(auth)/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Text className="text-gray-400  text-xl mt-10  px-4 text-center">
          Settings
        </Text>
        <TouchableOpacity>
          <View className="p-4  ml-2  w-fit mr-2  mt-5 justify-between  flex-row">
            <View className="flex-row gap-2">
              <FontAwesome name="user-circle" size={30} color="white" />
              <Text className="space-y-2   text-white text-sm font-pmedium self-center">
                Profile
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
              {/* <MaterialCommunityIcons
                name="food-apple"
                size={30}
                color="white"
              /> */}
              <Image
                source={require("../../../assets/l1.png")}
                className="w-[30px] h-[40px]"
                resizeMode=""
              />
              <Text className="space-y-2   text-white text-sm font-pmedium self-center">
                About
              </Text>
            </View>

            <View className="  self-center justify-items-center">
              <FontAwesome name="angle-right" size={30} color="grey" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible1(true);
          }}
        >
          <View className="p-4  ml-2  w-fit mr-2  justify-between  flex-row">
            <View className="flex-row gap-2">
              <MaterialCommunityIcons name="logout" size={30} color="white" />
              <Text className="space-y-2   text-white text-sm font-pmedium self-center">
                Logout
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Modal visible={modalVisible1} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible1(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text className="font-pregular text-white mb-5">
                    Are you sure you want to Logout
                  </Text>

                  {/* <View className="mb-2 mt-1">
                    <Button title="Logout" color="red" onPress={logout} />
                  </View> */}

                  <TouchableOpacity onPress={logout}>
                    <View className=" bg-red-600   mb-2  w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                      <Text className="  text-white  font-psemibold text-sm p-1">
                        Logout
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* 
                  <View className="mb-2 ">
                    <Button
                      title="Cancel"
                      color="#0f0f36"
                      onPress={() => setModalVisible1(false)}
                    />
                  </View> */}

                  <TouchableOpacity onPress={() => setModalVisible1(false)}>
                    <View className=" bg-black  mb-2  w-fit p-2 rounded-xl min-h-[20px]  justify-center items-center">
                      <Text className="  text-white  font-psemibold text-sm p-1">
                        Cancel
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

export default Settings;

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
