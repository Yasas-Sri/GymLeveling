import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  Pressable,
} from "react-native";
import { getUsers } from "../../../api/trainer";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

//import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { useLocalSearchParams } from "expo-router";

const NutritionPlan = () => {
  useEffect(() => {
    getUsers();
  }, []);

  const users = useStore((state) => state.users);
  const { userId } = useLocalSearchParams();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [breaksfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [title, setTitle] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEnddate] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  console.log(userId);

  const cancelRoutine = () => {
    setBreakfast("");
    setLunch("");
    setDinner("");
    setModalVisible1(true);
  };

  const discardRoutine = () => {
    router.push("/users/");
  };

  const saveNutritionPlan = async () => {
    await saveNutritionPlan({ title, breaksfast, lunch, dinner, userId });
  };

  const toggleDatepicker1 = () => {
    setShowPicker1(!showPicker1);
  };

  const toggleDatepicker2 = () => {
    setShowPicker2(!showPicker2);
  };

  const onChange1 = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker1();
        setStartDate(currentDate.toDateString());
      }
    } else {
      toggleDatepicker1();
    }
  };

  const onChange2 = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker2();
        setEnddate(currentDate.toDateString());
      }
    } else {
      toggleDatepicker2();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ paddingBottom: 400 }}>
        <View className="justify-between flex-row  mt-10">
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
            Create a Diet plan
          </Text>

          {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}

          <TouchableOpacity onPress={saveNutritionPlan}>
            <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
              <Text className=" justify-center self-center text-white">
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className=" space-y-2 mt-7 w-full  px-4 ">
          <View className="flex-row justify-start">
            <TextInput
              className="flex-1 text-white text-base font-psemibold bg-primary"
              placeholder="Diet Plan"
              placeholderTextColor="#808080"
              onChangeText={setTitle}
            />
            <MaterialCommunityIcons name="lead-pencil" size={30} color="grey" />
          </View>
        </View>

        <View className="space-y-2 flex-row items-center mx-2 px-0 gap-x-1 mt-4">
          <View>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              From
            </Text>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              To
            </Text>
          </View>

          <View className="space-y-2 flex-1 items-center mx-1 px-2 ">
            <Pressable onPress={toggleDatepicker1}>
              <View className="border border-blue-950 w-2/3 h-16 px-4  rounded-2xl  focus:border-orange-400  items-center flex-row">
                {showPicker1 && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange1}
                  />
                )}

                {/* {!showPicker && ( */}

                <TextInput
                  className="flex-1 text-white text-base font-psemibold bg-primary focus:border-orange-400 "
                  placeholder=" Start date"
                  placeholderTextColor="#808080"
                  value={startdate}
                  onChangeText={setStartDate}
                  editable={false}
                  onPressIn={toggleDatepicker1}
                  inputMode="numeric"
                />

                {/* ) } */}
              </View>
            </Pressable>

            <Pressable onPress={toggleDatepicker2}>
              <View className="border border-blue-950 w-2/3 h-16 px-4  rounded-2xl  focus:border-orange-400  items-center flex-row">
                {showPicker2 && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange2}
                  />
                )}

                {/* {!showPicker && ( */}

                <TextInput
                  className="flex-1 text-white text-base font-psemibold bg-primary focus:border-orange-400 "
                  placeholder="End date"
                  placeholderTextColor="#808080"
                  value={enddate}
                  onChangeText={setStartDate}
                  editable={false}
                  onPressIn={toggleDatepicker2}
                  inputMode="numeric"
                />

                {/* ) } */}
              </View>
            </Pressable>
          </View>
        </View>

        <View className="space-y-2 flex-row items-center mx-2 px-2 gap-x-1 mt-4">
          <View>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Breakfast
            </Text>
            <View className="border border-blue-950 w-full h-1/4 px-4  rounded-xl focus:border-orange-400  flex-row">
              <TextInput
                className="flex-1 text-white text-base font-psemibold "
                multiline={true}
                numberOfLines={10}
                placeholder="breakfast...."
                placeholderTextColor="#7b7b8b"
                value={breaksfast}
                onChangeText={setBreakfast}
                style={{
                  textAlignVertical: "top",
                }}
              />
            </View>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Lunch
            </Text>

            <View className="border border-blue-950 w-full h-1/4 px-4  rounded-xl focus:border-orange-400 ">
              <TextInput
                className="flex-1 text-white text-base font-psemibold"
                multiline={true}
                numberOfLines={10}
                placeholder="lunch...."
                placeholderTextColor="#7b7b8b"
                value={lunch}
                onChangeText={setLunch}
                style={{
                  textAlignVertical: "top",
                }}
              />
            </View>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Dinner
            </Text>
            <View className="border border-blue-950 w-full h-1/4 px-4 rounded-xl focus:border-orange-400 mb-10 ">
              <TextInput
                className="flex-1 text-white text-base font-psemibold "
                multiline={true}
                numberOfLines={10}
                placeholder="dinner..."
                placeholderTextColor="#7b7b8b"
                value={dinner}
                onChangeText={setDinner}
                style={{
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>
        </View>

        {/* modal for discard the routine           */}
        <Modal visible={modalVisible1} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible1(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text className="font-pregular">
                    Are you sure you want to discard the diet plan
                  </Text>

                  <View className="mb-2 ">
                    <Button
                      title="Discard Plan"
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
      </ScrollView>
    </SafeAreaView>
  );
};
// store ends

export default NutritionPlan;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,

    backgroundColor: "white",
    borderRadius: 10,
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
