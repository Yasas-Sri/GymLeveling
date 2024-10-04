import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
//import CustomButton from './CustomButton'

const WeightLog = () => {
  const initialTableData = [{ key: "1", set: "", weight: "", rep: "" }];

  const [tableData, setTableData] = useState(initialTableData);

  const handleInputChange = (key, field, value) => {
    const updatedTableData = tableData.map((row) => {
      if (row.key === key) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const addNewRow = () => {
    const newRow = {
      key: (tableData.length + 1).toString(),
      set: (tableData.length + 1).toString(),
      weight: "",
      rep: "",
    };
    setTableData([...tableData, newRow]); // Add the new row
  };

  const deleteRow = (key) => {
    const filteredData = tableData.filter((row) => row.key !== key);

    const updatedDataWithNewKeys = filteredData.map((row, index) => ({
      ...row,
      key: (index + 1).toString(),
    }));

    setTableData(updatedDataWithNewKeys);
  };

  // Render each row of the table
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {/* <TextInput
            style={styles.input}
            placeholder="1"
            keyboardType="numeric"
            value={item.name}
            onChangeText={value => handleInputChange(item.key, 'Set', value)}
          /> */}
      <View style={styles.input}>
        <Text className="text-white">{item.key}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="_"
        keyboardType="numeric"
        value={item.weight}
        onChangeText={(value) => handleInputChange(item.key, "weight", value)}
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="_"
        keyboardType="numeric"
        value={item.rep}
        onChangeText={(value) => handleInputChange(item.key, "rep", value)}
        placeholderTextColor="white"
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRow(item.key)}
      >
        <FontAwesome name="trash" size={15} color="grey" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Set</Text>
        <Text style={styles.headerText}>kg</Text>
        <Text style={styles.headerText}>Reps</Text>
      </View>

      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={addNewRow}>
        <Text style={styles.addButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A0A2C",
  },

  header: {
    flexDirection: "row",
    // backgroundColor: 'white',
    paddingVertical: 10,
    marginRight: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 2,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    // borderColor: '#ccc',
    // borderWidth: 1,
    // paddingHorizontal: 10,
    marginRight: 5,
    backgroundColor: "#0A0A2C", //#0A0A2C
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    // alignSelf:'center'
  },
  addButton: {
    backgroundColor: "#0f0f36",
    borderColor: "#363670",
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    borderRadius: 5,
    alignItems: "center",
    minHeight: 30,
    // borderRadius: 12,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});

export default WeightLog;
