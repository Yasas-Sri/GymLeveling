import React, { useState, useCallback } from "react";
import { Searchbar } from "react-native-paper";
import { View, FlatList } from "react-native";
import debounce from "lodash.debounce";
import SelectItemList from "./SelectItemList";
import useStore from "../store";

const data = require("../db.json");

const SelectExerciseSearch = ({ onSaveExercises }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const addedExercises = useStore((state) => state.addedExercises);
  const [exercises, setExercises] = useState(addedExercises);
  const { addExerciseDetails } = useStore();

  const toggleExerciseSelection = (exerciseID) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseID)
        ? prev.filter((id) => id !== exerciseID)
        : [...prev, exerciseID],
    );
  };

  // const saveExercise = useCallback(
  //   (exerciseID) => {
  //     if (!addedExercises.includes(exerciseID)) {
  //       addExerciseDetails(exerciseID, {
  //         sets: 0,
  //         reps: 0,
  //         weight: 0,
  //       });
  //     }
  //   },
  //   [addedExercises, addExerciseDetails],
  // );

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
          onSave={() => toggleExerciseSelection(item.id)}
          //  saveExercise(item.id)
        />
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  React.useEffect(() => {
    onSaveExercises(selectedExercises);
  }, [selectedExercises, onSaveExercises]);

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
      />
    </>
  );
};

export default SelectExerciseSearch;
