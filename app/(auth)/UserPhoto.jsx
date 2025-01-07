import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
//import { uploadImageToServer } from "../../api/userImages";
//import { FileObject } from "@supabase/storage-js";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";
import * as FileSystem from "expo-file-system";

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
    const img = assets[0];
    const base64 = await FileSystem.readAsStringAsync(img.uri, {
      encoding: "base64",
    });
    // Check if user is not null
    const filePath = `${user.id}/profile.${img.type === "image" ? "png" : "mp4"}`;
    const contentType = img.type === "image" ? "image/png" : "video/mp4";
    await supabase.storage
      .from("images")
      .upload(filePath, decode(base64), { contentType });
  } else {
    console.warn("User not authenticated.");
  }
};

const UserPhoto = () => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (photo?.length > 0) {
      setIsLoading(true);
      await saveImage(photo);
      setIsLoading(false);
      router.replace("/index");
    }
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
      setModalVisible(false);
      setPhoto(result?.assets || []);
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
      setModalVisible(false);
      setPhoto(result?.assets || []);
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
      <View className="flex-1 justify-start items-center my-1.5">
        <Text className="text-white text-2xl font-psemibold">
          One Last step
        </Text>
      </View>
      <View className="border-borderB border-2 justify-start items-center bg-cardB ">
        <Text className="text-white text-xl font-pmedium mt-5">
          Add your photo here
        </Text>

        <TouchableOpacity
          className="mt-5"
          onPress={() => setModalVisible(true)}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <FontAwesome name="circle" size={300} color="grey" />
          )}
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible("false")}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity className="mt-5" onPress={takePhoto}>
                  <FontAwesome5 name="camera-retro" size={50} color="#0A0A2C" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-5"
                  onPress={pickImageFromGallery}
                >
                  <FontAwesome5 name="image" size={50} color="#0A0A2C" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <View className=" px-4 my-20">
        <CustomButton
          title="Start your journey"
          handlePress={handleClick}
          containerStyles="mt-5"
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserPhoto;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 200,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    // borderColor: 'grey',
  },
});
