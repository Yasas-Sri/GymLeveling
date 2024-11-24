import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import useStore from "../../store";

const GenIcon = ({ icon, size, gender }) => {
  return (
    <View className="items-center justify-center gap-2">
      <MaterialCommunityIcons name={icon} size={size} color={"white"} />
      <Text className="text-white text-lg font-pmedium">{gender}</Text>
    </View>
  );
};

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const { setUserInfo } = useStore();
  const handleGenderPress = (gender) => {
    setSelectedGender(gender); // Update the selected gender state
  };

  const handleClick = () => {
    if (selectedGender) {
      setUserInfo({ gender: selectedGender });
      router.replace("/userInfo");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="space-y-2 mt-7 w-full  px-4 ">
        <Image
          source={require("../../assets/l3.png")}
          className="w-[115px] h-[120px] "
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 justify-start items-center mt-10">
        <Text className="text-white text-2xl font-psemibold">
          Tell us about You
        </Text>

        <Text className="text-white text-2xl font-pmedium mt-10">Select</Text>

        <View className="mt-20 justify-between items-start flex-row gap-x-7  ">
          <TouchableOpacity
            onPress={() => handleGenderPress("Male")}
            disabled={selectedGender === "Female"}
          >
            <View
              className={`border-white border-2 px-4 py-4 ${selectedGender === "Male" ? "border-secondary" : ""}`}
            >
              <GenIcon icon="face-man-shimmer" size={70} gender="Male" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleGenderPress("Female")}
            disabled={selectedGender === "Male"}
          >
            <View
              className={`border-white border-2 px-4 py-4 ${selectedGender === "Female" ? "border-secondary" : ""}`}
            >
              <GenIcon icon="face-woman-shimmer" size={70} gender="Female" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className=" px-4 my-20">
        <CustomButton
          title="Continue"
          handlePress={handleClick}
          containerStyles="mt-5"
          // isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default Gender;
