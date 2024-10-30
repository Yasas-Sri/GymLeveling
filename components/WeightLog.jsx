import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import useStore from "../store";
//import CustomButton from './CustomButton'

const WeightLog = ({ exerciseId, flag, initialData, onCheckboxChange }) => {
  //console.log(initialData.reps);
  //console.log(initialData.weight);
  const initialTableData = [
    {
      key: "1",
      set: "1",
      weight: initialData ? JSON.stringify(initialData.weight) : "",
      rep: initialData ? JSON.stringify(initialData.reps) : "",
      checked: false,
    },
  ];

  const { addExerciseDetails, loggedExerciseDetails } = useStore();
  const [tableData, setTableData] = useState(initialTableData);
  const loggedExercises = useStore((state) => state.loggedExercises);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Automatically log initial data when component mounts if flag is true
    if (flag) {
      //   const sets = tableData.map((row) => row.set);
      //   const reps = tableData.map((row) => row.rep);
      //   const weights = tableData.map((row) => row.weight);
      const checkedRows = tableData.filter((row) => row.checked);
      const sets = checkedRows.map((row) => row.set);
      const reps = checkedRows.map((row) => row.rep);
      const weights = checkedRows.map((row) => row.weight);
      // const hasDataToLog =
      //   reps.some((rep) => rep !== "") ||
      //   weights.some((weight) => weight !== "");
      // if (hasDataToLog) {
      //   loggedExerciseDetails(exerciseId, { sets, reps, weights });
      // }
      loggedExerciseDetails(exerciseId, { sets, reps, weights });
    }
  }, [exerciseId, flag, loggedExerciseDetails, tableData]);

  //const addedExercises = useStore((state) => state.addedExercises);

  const handleCheckboxChange = (key) => {
    const updatedTableData = tableData.map((row) => {
      if (row.key === key) {
        if (row.rep !== "" && row.weight !== "") {
          return { ...row, checked: !row.checked };
        }
      }
      return row;
    });
    setTableData(updatedTableData);
    const anyChecked = updatedTableData.some((row) => row.checked);
    onCheckboxChange(anyChecked);
  };

  const handleInputChange = (key, field, value) => {
    const updatedTableData = tableData.map((row) => {
      if (row.key === key) {
        const updatedRow = { ...row, [field]: value };

        // Automatically uncheck if rep or weight becomes empty
        if (field === "rep" || field === "weight") {
          if (updatedRow.rep === "" || updatedRow.weight === "") {
            updatedRow.checked = false;
          }
        }

        return updatedRow;
      }
      return row;
    });
    setTableData(updatedTableData);
    // console.log(tableData);
    // addExerciseDetails(exerciseId, tableData);
    //  console.log(addedExercises);

    if (!flag) {
      const sets = updatedTableData.map((row) => row.set);
      const reps = updatedTableData.map((row) => row.rep);
      const weights = updatedTableData.map((row) => row.weight);
      addExerciseDetails(exerciseId, { sets, reps, weights });
    }

    // console.log(addedExercises);
  };

  const addNewRow = () => {
    const newRow = {
      key: (tableData.length + 1).toString(),
      set: (tableData.length + 1).toString(),
      weight: "",
      rep: "",
      checked: false,
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
      {/* <Text> */}
      {flag && (
        <View className=" justify-center align-middle gap-8">
          <Checkbox
            style={styles.checkbox}
            value={item.checked}
            onValueChange={() => handleCheckboxChange(item.key)}
            color={item.checked ? "#FF7E06" : undefined}
          />
        </View>
      )}
      {/* </Text> */}
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
  checkbox: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default WeightLog;
