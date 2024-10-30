import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useStore from "../store";

// const addExercise = () => {
//   setExercises((prevExercises) => [...prevExercises, inputText]);
// };

const SelectItemList = React.memo(
  ({ name, gifPhoto, exerciseID, onSave }) => {
    const addedExercises = useStore((state) => state.addedExercises);
    const [exercises, setExercises] = useState(addedExercises);

    // const addExercise = useStore((state) => state.addExercise);
    const { addExerciseDetails } = useStore();

    // const saveExercise = () => {
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

    // useEffect(() => {
    //   console.log(exercises);
    // }, [exercises]);

    return (
      <TouchableOpacity onPress={onSave}>
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

SelectItemList.displayName = "SelectItemList";
export default SelectItemList;
