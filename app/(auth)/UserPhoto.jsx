// import React, { useState,useEffect } from 'react';
// import { View, Text, Button, Image, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const userPhoto = () => {

//  const[GalleryPermission,setGalleryPermission] = useState(null);
//  const [Photo,setPhoto] = useState(null);

//  useEffect(()=>{

//    (async ()=>{
//       const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       setGalleryPermission(galleryStatus.status==='granted')
//    })();
//  },[]);

//  const pickImage = async () =>{

//     let result = await ImagePicker.launchImageLibraryAsync({
//        mediaTypes: ImagePicker.MediaTypeOptions.Images,
//        allowsEditing:true,
//        aspect:[4,3],
//        quality:1,
//     })

//     console.log(result)

//     if(!result.canceled){
//        setPhoto(result.url)
//     }
//  }

//  if(GalleryPermission === false){

//    return <Text>No access to internal Storage</Text>
//  }

//   return (
//      <View>
//          <Button title='Pick Image' onPress={()=>pickImage()}/>
//          {image && <Image source={{uri:image}}/>}
//      </View>
//   );
// };

// export default userPhoto

////////////////

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const UserPhoto = () => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    router.replace("/home");
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }

    setModalVisible(false);
  };

  const takePhoto = async () => {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }

    setModalVisible(false);
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
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity className="mt-5" onPress={takePhoto}>
                <FontAwesome5 name="camera-retro" size={50} color="#0A0A2C" />
              </TouchableOpacity>

              <TouchableOpacity className="mt-5" onPress={pickImageFromGallery}>
                <FontAwesome5 name="image" size={50} color="#0A0A2C" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <Button title="Pick Image from Gallery" onPress={pickImageFromGallery} color="#FF7E06" />
      <Button title="Take a Photo" onPress={takePhoto}  /> */}
        {/* {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, borderRadius: 100, marginTop: 20 }}
        />
      )} */}
      </View>

      <View className=" px-4 my-20">
        <CustomButton
          title="Start your journey"
          handlePress={handleClick}
          containerStyles="mt-5"
          // isLoading={isSubmitting}
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
