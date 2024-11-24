import {
  View,
  Text,
  Pressable,
  Platform,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
//import FormField from '../../components/FormField'
//import {Picker} from '@react-native-picker/picker';
import SelectPicker from "../../components/SelectPicker";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import useStore from "../../store";
import { saveSignupdata } from "../../api/signupData";

//  import { TextInput } from 'react-native-paper'

const UserInfo = () => {
  const { setUserInfo } = useStore();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const handleSelect = (value) => {
    setExperienceLevel(value);
  };

  const handleClick = async () => {
    if (dateOfBirth && height && weight && experienceLevel) {
      setUserInfo({
        dateOfBirth,
        height,
        weight,
        experienceLevel,
      });
      await saveSignupdata();
      router.replace("/UserPhoto");
    }
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-primary h-full">
        <View className="space-y-2 mt-7 w-full  px-4 ">
          <Image
            source={require("../../assets/l3.png")}
            className="w-[115px] h-[120px] "
            resizeMode="contain"
          />

          <Text className="text-base text-gray-100 font-pmedium">
            Date of Birth
          </Text>

          <Pressable onPress={toggleDatepicker}>
            <View className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl  focus:border-orange-400  items-center flex-row">
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                />
              )}

              {/* {!showPicker && ( */}

              <TextInput
                className="flex-1 text-white text-base font-psemibold bg-primary focus:border-orange-400 "
                placeholder=" Date"
                placeholderTextColor="#808080"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                editable={false}
                onPressIn={toggleDatepicker}
                inputMode="numeric"
              />

              {/* ) } */}
            </View>
          </Pressable>
        </View>

        <View className="space-y-2 mt-7 w-full px-4 justify-center ">
          <Text className="text-base text-gray-100 font-pmedium">Height</Text>

          <View className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl focus:border-orange-400 items-center flex-row">
            <TextInput
              className="flex-1 text-white text-base font-psemibold bg-primary"
              placeholder="  height"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              inputMode="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        </View>

        <View className="space-y-2 mt-7 w-full px-4 justify-center ">
          <Text className="text-base text-gray-100 font-pmedium">Weight</Text>

          <View className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl focus:border-orange-400 items-center flex-row">
            <TextInput
              className="flex-1 text-white text-base font-psemibold bg-primary"
              placeholder="  weight"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              inputMode="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
        </View>

        <View className="space-y-2 mt-7 w-full px-4 justify-center ">
          <Text className="text-base text-gray-100 font-pmedium">
            Experience level
          </Text>

          <View className="  focus:border-orange-400 ">
            {/* className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl focus:border-orange-400 items-center flex-row" */}

            {/* <TextInput
            className="flex-1 text-white text-base font-psemibold bg-primary"
            placeholder="time period"
            placeholderTextColor="#7b7b8b"
            keyboardType='numeric'
            inputMode='numeric'
                     /> */}
            <SelectPicker onSelect={handleSelect} />
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
    </TouchableWithoutFeedback>
  );
};

// const styles = StyleSheet.create({
//    pickerContainer: {
//      backgroundColor: 'blue',        // Blue background for the dropdown on Android
//      borderRadius: 8,
//    },
//    picker: {
//      color: 'white',                 // Sets text color inside Picker
//      backgroundColor: 'blue',        // Apply background color for Android
//    }
//  });

export default UserInfo;
