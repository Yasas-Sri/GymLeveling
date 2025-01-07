import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const SelectedRole = ({ onSelect }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleValueChange = (value) => {
    setSelectedRole(value);
    onSelect(value); // Call the onSelect callback to update experience level in state 
  };
  // border-2 border-blue-950 w-full h-16 px-4  rounded-2xl focus:border-orange-400 items-center flex-row
  return (
    <View>
      <View className="border-blue-950 border-2 rounded-2xl font-pmedium w-full h-16  focus:border-orange-400 items-center flex-1">
        <RNPickerSelect
          onValueChange={handleValueChange}
          items={[
            //  { label: "Select time", value: "" },
            { label: "Member", value: "Member" },
            { label: "Trainer", value: "Trainer" },
          ]}
          style={{
            inputAndroid: {
              color: "white",
              backgroundColor: "#0A0A2C",
              // borderColor:'#363670',
              // borderRadius:5,
            },
            inputIOS: {
              color: "white",
              backgroundColor: "#0A0A2C",
              // borderColor:'#363670',
              // borderRadius:5,
            },
            placeholder: {
              color: "grey",
              // fontFamily:'Poppins-SemiBold", "sans-serif',
              label: "Select role",
              value: null,
            },
          }}
          placeholder={{
            label: "Select role",
            value: null,
            color: "white",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    height: "10",
    backgroundColor: "#0A0A2C",
    padding: 5,
    //width: "100%",
    // borderRadius: 1,
    // borderColor: '#363670'
  },
});

export default SelectedRole;
