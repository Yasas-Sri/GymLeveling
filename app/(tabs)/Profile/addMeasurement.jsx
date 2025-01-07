import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import SelectExerciseSearch from "../../../components/SelectExerciseSearch";
import useStore from "../../../store";
import { router } from "expo-router";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
//import { TextInput } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { saveProgress } from "../../../api/progresstracking";

const saveImage = async (assets) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!(assets?.length > 0)) {
    Alert.alert("No photo", "Add a Profile Photo", [
      // {
      //   text: "Cancel",
      //   onPress: () => console.log(""),
      //   style: "cancel",
      // },
      { text: "OK", onPress: () => console.log("") },
    ]);
    return;
  }
  if (user) {
    console.log("inside save image");
    const img = assets[0];
    const base64 = await FileSystem.readAsStringAsync(img.uri, {
      encoding: "base64",
    });
    console.log("inside save image2");
    // Check if user is not null
    // const uniqueFileName = `${Date.now()}-${uuidv4()}`;
    const fileName = `${Date.now()}`;
    //console.log("Uploading to uniquefilename:", uniqueFileName);
    // console.log("Uploading to useridname:", Date.now());
    const filePath = `${user.id}/${fileName}.${img.type === "image" ? "png" : "mp4"}`;
    const contentType = img.type === "image" ? "image/png" : "video/mp4";
    console.log("Uploading to filePath:", filePath);
    console.log("Content type:", contentType);
    await supabase.storage
      .from("progress")
      .upload(filePath, decode(base64), { contentType });

    // console.log("Uploading to filePath:", filePath);
    // console.log("Content type:", contentType);
    return fileName;
  } else {
    console.warn("User not authenticated.");
  }
};

const AddMeasurement = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [weight, setWeight] = useState();
  const { addprogressImage } = useStore.getState();
  const userSession = useStore((state) => state.userSession);

  const fetchNewProgressImages = async () => {
    const { data, error } = await supabase.storage
      .from("progress")
      .list(userSession.id); // Fetch updated image list
    if (error) {
      console.error("Error fetching updated image:", error.message);
    } else {
      //setFiles(data); // Update the state with the latest files
      addprogressImage(data);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const handleClick = async () => {
    let fileName = null;
    if (photo?.length > 0) {
      fileName = await saveImage(photo);
    }
    await saveProgress({ weight, fileName });
    await fetchNewProgressImages();
    router.replace("/Profile/measurements");
    //  console.log(" uniquefilename inside handleclick:", uniqueFileName);
  };

  const pickImageFromGallery = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setModalVisible1(false);
      setPhoto(result?.assets || []);
      setModalVisible2(true);
    }
  };

  const takePhoto = async () => {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setModalVisible1(false);
      setPhoto(result?.assets || []);
      setModalVisible2(true);
    }
  };

  // console.log("date now", Date.now());

  return (
    <View className="bg-primary h-full">
      <View className="justify-between flex-row mt-10">
        <TouchableOpacity>
          <View className=" bg-cardB border-borderB border p-4 rounded-xl ml-2 w-24 ">
            <Text className="text-secondary justify-center self-center">
              Cancel
            </Text>
          </View>
        </TouchableOpacity>

        <Text className="text-white justify-items-center self-center text-sm font-psemibold">
          Add Measurements
        </Text>

        {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}

        <TouchableOpacity onPress={handleClick}>
          <View className=" bg-secondary border-borderB border p-4  rounded-xl mr-2 w-24">
            <Text className=" justify-center self-center text-white">Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className=" flex-row mt-3 mx-2 justify-between p-3">
        <Text className="text-white text-base">Date</Text>
        <Text className="text-white text-base">{formattedDate}</Text>
      </View>

      <View className=" mt-2 p-3">
        <Text className="text-gray-400 text-base p-2">Measurements</Text>

        <View className=" flex-row  mx-2 justify-between p-3 gap-x-2 self-center">
          <Text className="text-white text-base self-center">
            Body Weight -
          </Text>
          <View className=" w-2/3 h-16 px-4  rounded-2xl focus:border-orange-400 self-center flex-row">
            <TextInput
              className="flex-1 text-white text-base font-psemibold bg-primary"
              placeholder="_"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              inputMode="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
        </View>
      </View>

      <View className="mt-2 p-3">
        <Text className="text-gray-400 text-base p-2">Progress Picture</Text>

        {imageUri ? (
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              onPress={() => {
                setImageUri(null);
                setPhoto(null);
              }}
              style={{
                position: "absolute",
                top: 10, // Adjust as needed
                right: 100, // Adjust as needed
                zIndex: 10,
              }}
            >
              {/* <View className=""> */}
              <FontAwesome name="window-close" size={27} color="gray" />
              {/* </View> */}
            </TouchableOpacity>

            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible1(true)}>
            <View className="border-borderB border  rounded-lg justify-center items-center h-64">
              <FontAwesome5 name="camera-retro" size={30} color="gray" />
              <Text className="text-gray-400 text-base p-3 text-center ">
                Add Picture
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={modalVisible1} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible1("false")}>
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent}>
              <View className=" bg-cardB p-3 rounded-md w-full border-borderB">
                <TouchableOpacity
                  className="mt-5 flex-row gap-x-3"
                  onPress={takePhoto}
                >
                  <FontAwesome5 name="camera-retro" size={30} color="white" />
                  <Text className="text-base font-pmedium self-center text-white">
                    Take Photo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-5 flex-row gap-x-3"
                  onPress={pickImageFromGallery}
                >
                  <FontAwesome5 name="image" size={30} color="white" />
                  <Text className="text-base font-pmedium self-center text-white">
                    Select from gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddMeasurement;

const styles = StyleSheet.create({
  modalContainer2: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
    width: "100%",
  },

  modalContent: {
    // width: 300,
    width: "100%",
    padding: 25,

    backgroundColor: "rgba(15, 15, 54,0.8)",
    //borderRadius: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "20%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: "#363670",
    borderWidth: 1,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
    //borderWidth: 2,
    // borderColor: 'grey',
  },
});
