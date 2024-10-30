// import { View, Text } from 'react-native'
// import React,{useState} from 'react'
// import RNButton from '../../components/RNButton'
// import { Link,Redirect,router } from 'expo-router';
// import Preset from '../Preset';
// import Exercises from '../Exercises';

// const Workout = ({}) => {

//     const [activeComponent, setActiveComponent] = useState('Preset');

//   return (

//     <View className="bg bg-primary h-full">
//     <View className="justify-around items-start flex-row mt-10">

//         <RNButton mode="contained-tonal" title="Preset"   style={`rounded-r-lg  ${activeComponent === 'Preset' ? 'bg-secondary ' : 'bg-lightB  '} `} handlePress={() => setActiveComponent('Preset')} />

//       <RNButton mode="contained-tonal" title="Exercises" style={`rounded-l-lg  ${activeComponent === 'Exercises' ? 'bg-secondary' : 'bg-lightB '} gap-x-44 `}
//          handlePress={() => setActiveComponent('Exercises')}/>

//       </View>
//       {activeComponent === 'Preset' && (
//         <View className="mt-10 ">

//             <Preset/>

//         </View>
//       )}
//       {activeComponent === 'Exercises' && (
//         <View className="mt-8">
//              <Exercises/>
//         </View>
//       )}

//     </View>

//   )
// }

// export default Workout

import { View } from "react-native";
import React, { useState, useEffect, useFocusEffect, useCallback } from "react";
import RNButton from "../../../components/RNButton";
//import { Link,Redirect,router } from 'expo-router';
import Preset from "./Preset";
import Exercises from "./Exercises";
import { getRoutine } from "../../../api/exerciseRoutines";
//import { s, vs, ms } from 'react-native-size-matters';
import useStore from "../../../store";

const Workout = () => {
  const [activeComponent, setActiveComponent] = useState("Preset");
  const saveRoutines = useStore((state) => state.saveRoutines);

  useEffect(() => {
    getRoutine();
  }, []);

  return (
    <View className="bg-primary h-full">
      <View className="justify-around items-start flex-row mt-10">
        <RNButton
          mode="contained-tonal"
          title="Preset"
          textColor="white"
          style={`rounded-r-lg ${activeComponent === "Preset" ? "bg-secondary" : "bg-lightB"}`}
          handlePress={() => setActiveComponent("Preset")}
        />

        <RNButton
          mode="contained-tonal"
          title="Exercises"
          textColor="white"
          style={`rounded-l-lg ${activeComponent === "Exercises" ? "bg-secondary" : "bg-lightB"} gap-x-40`}
          handlePress={() => setActiveComponent("Exercises")}
        />
      </View>

      {activeComponent === "Preset" && (
        <View className="mt-10">
          <Preset />
        </View>
      )}
      {activeComponent === "Exercises" && (
        <View className="mt-8">
          <Exercises />
        </View>
      )}
    </View>
  );
};

export default Workout;
