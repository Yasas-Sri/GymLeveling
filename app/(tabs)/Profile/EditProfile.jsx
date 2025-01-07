import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import ImageItem from "../../../components/ImageItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import useStore from "../../../store";

// const updateImage = async (assets) => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!(assets?.length > 0)) {
//     Alert.alert("No photo", "Add a Profile Photo", [
//       { text: "OK", onPress: () => console.log("") },
//     ]);
//     return;
//   }

//   if (!user) {
//     console.warn("User not authenticated.");
//     return;
//   }

//   const img = assets[0];
//   const base64 = await FileSystem.readAsStringAsync(img.uri, {
//     encoding: "base64",
//   });
//   const filePath = `${user.id}/profile.${img.type === "image" ? "png" : "mp4"}`;
//   const contentType = img.type === "image" ? "image/png" : "video/mp4";

//   try {
//     // Upload the new file to the same path (this overwrites the existing file)
//     const { data, error: uploadError } = await supabase.storage
//       .from("images")
//       .upload(filePath, decode(base64), {
//         contentType,
//         upsert: true, // This ensures the file is overwritten if it already exists
//       });

//     if (uploadError) {
//       console.error("Error uploading file:", uploadError.message);
//       Alert.alert("Error", "Failed to update profile photo.");
//       return;
//     }

//     Alert.alert("Success", "Profile photo updated successfully.");
//     console.log("Uploaded file:", data);
//   } catch (error) {
//     console.error("Error updating image:", error.message);
//   }
// };

const EditProfile = () => {
  const updateImage = async (assets) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!(assets?.length > 0)) {
      Alert.alert("No photo", "Add a Profile Photo", [
        { text: "OK", onPress: () => console.log("") },
      ]);
      return;
    }

    if (!user) {
      console.warn("User not authenticated.");
      return;
    }

    const img = assets[0];
    const base64 = await FileSystem.readAsStringAsync(img.uri, {
      encoding: "base64",
    });
    const filePath = `${user.id}/profile.${img.type === "image" ? "png" : "mp4"}`;
    const contentType = img.type === "image" ? "image/png" : "video/mp4";

    try {
      // Use the `update` method to overwrite the existing file
      const { data, error } = await supabase.storage
        .from("images")
        .update(filePath, decode(base64), {
          contentType,
          cacheControl: "3600", // Optional cache control header
          upsert: true, // Ensure the file is created if it doesn’t exist
        });

      if (error) {
        console.error("Error updating file:", error.message);
        Alert.alert("Error", "Failed to update profile photo.");
        return;
      }
      //addImage(assets);
      Alert.alert("Success", "Profile photo updated successfully.");
      // console.log("Updated file:", data);
    } catch (error) {
      console.error("Error updating image:", error.message);
    }
  };

  const fetchUpdatedImage = async () => {
    const { data, error } = await supabase.storage.from("images").list(User.id); // Fetch updated image list
    if (error) {
      console.error("Error fetching updated image:", error.message);
    } else {
      //setFiles(data); // Update the state with the latest files
      addImage(data);
    }
  };

  const [files, setFiles] = useState([]);
  const [User, setUser] = useState({});
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false); // new photo modal
  const [gender, setGender] = useState("");
  const [name, setName] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageFiles = useStore((state) => state.imageFiles);
  const { addImage } = useStore.getState();
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

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
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

  const handleClick = async () => {
    if (photo?.length > 0) {
      //setIsLoading(true);

      await updateImage(photo);
      await addImage(photo);
      await fetchUpdatedImage();
      //console.log(imageFiles);
      setModalVisible2(false);
      //loadDP();
    }
  };

  //console.log(imageFiles);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Text className="text-gray-400  text-xl mt-10  px-4 text-center">
          Edit Profile
        </Text>

        <View className=" flex-row  gap-2  justify-center items-center mt-5 mx-2  px-2">
          <TouchableOpacity
            className="mt-2"
            onPress={() => setModalVisible1(true)}
          >
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
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="" onPress={() => setModalVisible1(true)}>
          <Text className="text-secondary ml-3  py-4 text-base  text-center">
            change profile picture
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-gray-400 ml-3 px-4 py-4 text-base">
            Public Profile Data
          </Text>
        </View>
        <View className="space-y-2 flex-row items-center mx-2 px-0 gap-x-1 mt-4">
          <View>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Name
            </Text>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Gender
            </Text>
            <Text className="text-base text-gray-100 font-pmedium  ml-3   px-4 py-4">
              Birthday
            </Text>
          </View>

          <View className="space-y-2 flex-1 items-center mx-1 px-2 ">
            <View className="border-2 border-blue-950 w-2/3 h-16 px-4  rounded-2xl focus:border-orange-400  flex-row">
              <TextInput
                className="flex-1 text-white text-base font-psemibold"
                placeholder="Name"
                placeholderTextColor="#7b7b8b"
                value={name}
                onChangeText={setName}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View className="border-2 border-blue-950 w-2/3 h-16 px-4  rounded-2xl focus:border-orange-400  flex-row">
                <TextInput
                  className="flex-1 text-white text-base font-psemibold"
                  placeholder="Gender"
                  placeholderTextColor="#7b7b8b"
                  value={gender}
                  editable={false} // Disable the keyboard
                  onPressIn={() => setModalVisible("true")}
                />
              </View>
            </TouchableOpacity>
            <Pressable onPress={toggleDatepicker}>
              <View className="border-2 border-blue-950 w-2/3 h-16 px-4  rounded-2xl  focus:border-orange-400  items-center flex-row">
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
        </View>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible("false")}>
            <View style={styles.modalContainer2}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent2}>
                  <View className="mb-2     w-full   ">
                    <View className="">
                      <Button
                        title="Male"
                        color="#0f0f36"
                        onPress={() => {
                          setGender("Male");
                          setModalVisible(false);
                        }}
                        //disabled={isLoading}
                        //className={isLoading ? "opacity-50" : "#0f0f36"}
                      />
                    </View>
                    <View className="mt-2">
                      <Button
                        title="Female"
                        color="#0f0f36"
                        onPress={() => {
                          setGender("Female");
                          setModalVisible(false);
                        }}
                        //disabled={isLoading}
                        //className={isLoading ? "opacity-50" : "#0f0f36"}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={modalVisible1} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible1("false")}>
            <View style={styles.modalContainer2}>
              <View style={styles.modalContent}>
                <View className=" bg-slate-100 p-3 rounded-md w-full">
                  <TouchableOpacity
                    className="mt-5 flex-row gap-x-3"
                    onPress={takePhoto}
                  >
                    <FontAwesome5
                      name="camera-retro"
                      size={30}
                      color="#0A0A2C"
                    />
                    <Text className="text-base font-pmedium self-center">
                      Take Photo
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="mt-5 flex-row gap-x-3"
                    onPress={pickImageFromGallery}
                  >
                    <FontAwesome5 name="image" size={30} color="#0A0A2C" />
                    <Text className="text-base font-pmedium self-center">
                      Select from gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={modalVisible2} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible2("false")}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent3}>
                <View className="mt-2">
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <FontAwesome name="circle" size={300} color="grey" />
                  )}
                </View>
                <View className="flex-row mt-5">
                  {/* <Button
                    title="Cancel"
                    color="#0f0f36"
                    containerStyle={{
                      width: 2,
                    }}
                  /> */}
                  <TouchableOpacity
                    onPress={() => {
                      handleClick();
                      setModalVisible2(false);
                    }}
                    className="bg-primary rounded w-24 h-12 m-3"
                  >
                    <Text className="text-white text-base  justify-center self-center m-2">
                      Ok
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setPhoto([]);
                      setModalVisible2(false);
                    }}
                    className="bg-secondary rounded w-24 h-12 m-3  "
                  >
                    <Text className="text-white text-base  justify-center self-center m-2">
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  {/* <Button
                    title="Ok"
                    color="#0f0f36"
                    containerStyle={{
                      width: 200,
                    }}
                  /> */}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    // width: 300,
    width: "100%",
    padding: 25,

    backgroundColor: "white",
    //borderRadius: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "20%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  modalContent3: {
    width: 300,
    height: 350,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
    borderWidth: 2,
    // borderColor: 'grey',
  },

  button: {
    width: 50,
  },
});
