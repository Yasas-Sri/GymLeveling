import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import FastImage from "react-native-fast-image";
import { WebView } from "react-native-webview";
import { Image } from "expo-image";

const ItemList = React.memo(
  ({ name, gifPhoto, exerciseID }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/Workout/ExerciseData",
            params: { exerciseId: `${exerciseID}` },
          })
        }
      >
        <View className="justify-start flex-row ml-2">
          <View className="h-14 bg-white rounded-full w-14 mb-5 overflow-hidden">
            <Image source={{ uri: gifPhoto }} className="w-14 h-14" />
          </View>

          <Text className="my-0.5 rounded border-slate-600 border-solid text-white py-2 px-4 font-pregular text-base capitalize ">
            {name}
          </Text>
          {/* <Text>{target}</Text> */}
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if props change
    return (
      prevProps.name === nextProps.name &&
      prevProps.gifPhoto === nextProps.gifPhoto
    );
  },
);

ItemList.displayName = "ItemList";

export default ItemList;
