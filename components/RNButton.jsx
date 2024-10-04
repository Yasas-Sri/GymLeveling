import * as React from "react";
import { Button } from "react-native-paper";
import { Text } from "react-native";

const RNButton = ({ mode, title, style, handlePress, color }) => (
  <Button mode={mode} className={style} onPress={handlePress}>
    <Text className="text-white">{title}</Text>
  </Button>
);

export default RNButton;
