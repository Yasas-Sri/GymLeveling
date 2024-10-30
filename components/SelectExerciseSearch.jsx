import React, { useState, useCallback } from "react";
import { Searchbar } from "react-native-paper";
import { View, FlatList } from "react-native";
import debounce from "lodash.debounce";
import SelectItemList from "./SelectItemList";
import useStore from "../store";

const data = require("../db.json");

const SelectExerciseSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const addedExercises = useStore((state) => state.addedExercises);
  const [exercises, setExercises] = useState(addedExercises);
  const { addExerciseDetails } = useStore();

  // const saveExercise = (exerciseID) => {
  //   setExercises((prevExercises) => {
  //     // Check if the exerciseID is already in the exercises array
  //     if (!prevExercises.includes(exerciseID)) {
  //       // If not, add it to the state
  //       const updatedExercises = [...prevExercises, exerciseID];
  //       // Add the new exercise to the global store
  //       addExerciseDetails(exerciseID, {
  //         sets: 0,
  //         reps: 0,
  //         weight: 0,
  //       });
  //       return updatedExercises;
  //     }
  //     // If the exerciseID is already in the state, return the current state
  //     return prevExercises;
  //   });
  // };

  const saveExercise = useCallback(
    (exerciseID) => {
      if (!addedExercises.includes(exerciseID)) {
        addExerciseDetails(exerciseID, {
          sets: 0,
          reps: 0,
          weight: 0,
        });
      }
    },
    [addedExercises, addExerciseDetails],
  );

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, 300),
    [],
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <SelectItemList
          name={item.name}
          exerciseID={item.id}
          gifPhoto={item.gifUrl}
          onSave={() => saveExercise(item.id)}
        />
      </View>
    ),
    [saveExercise],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        className="mx-7 mb-3.5 bg-lightB  border-borderB border-2  "
        inputStyle={{ color: "white" }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10} // How many items to render initially
        maxToRenderPerBatch={10} // Render this many items per scroll batch
        windowSize={5}

        // getItemLayout={(data, index) => (
        //   { length: 14, offset: 14 * index, index }
        // )}
      />
    </>
  );
};

export default SelectExerciseSearch;
