import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import ProgressImagesItem from "../../../components/ProgressImagesItem";
import useStore from "../../../store";
import { supabase } from "../../../lib/supabase";
import { getProgress } from "../../../api/progresstracking";

const Measurements = () => {
  useEffect(() => {
    getProgress();
  }, []);

  const addMeasurement = () => {
    router.push("/Profile/addMeasurement");
  };

  const userSession = useStore((state) => state.userSession);
  const progressimageFiles = useStore((state) => state.progressimageFiles);
  const progress = useStore((state) => state.progress);
  const { addprogressImage } = useStore.getState();


  console.log("progressimageFiles", progressimageFiles);
  useEffect(() => {
    const loadDP = async () => {
      // const {data: { user },  } = await supabase.auth.getUser();
      //console.log(user);
      const { data } = await supabase.storage
        .from("progress")
        .list(userSession.id);
      // console.log(data);
      if (data) {
        // setFiles(data);
        await addprogressImage(data);
      }
      // console.log(files);
    };
    loadDP();
  }, [userSession.id, addprogressImage]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View>
          <Text className="text-center text-gray-400  text-lg mt-10">
            Measurements
          </Text>

          {progressimageFiles && progressimageFiles.length > 0 ? (
            <View className="mt-6 ">
              {Array.isArray(progressimageFiles) &&
              progressimageFiles.length === 1 ? (
                <ProgressImagesItem
                  key={progressimageFiles[0].id}
                  item={progressimageFiles[0]}
                  userId={userSession.id}
                  progress={progress}
                />
              ) : (
                progressimageFiles.map((item) => (
                  <ProgressImagesItem
                    key={item.id}
                    item={item}
                    userId={userSession.id}
                    progress={progress}
                  />
                ))
              )}
            </View>
          ) : (
            <View className="mt-10 p-1">
              <View className="justify-center items-center">
                <MaterialCommunityIcons name="human" size={30} color="gray" />
              </View>
              <Text className="text-center text-white  text-xl mt-2">
                No Measurements
              </Text>
              <Text className="text-center text-gray-400  text-sm mt-3 p-3">
                Start tracking the progress of your body measurements and
                progress pictures
              </Text>
            </View>
          )}

          <View className="space-y-2  mt-0   w-full  px-4 mb-4">
            <CustomButton
              title="+ Add Measurement"
              handlePress={addMeasurement}
              containerStyles="mt-7"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Measurements;
