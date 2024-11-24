import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text className="text-lg font-psemibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
