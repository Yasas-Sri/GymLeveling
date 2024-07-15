import { View, Text } from 'react-native'
import React,{useState} from 'react'
import RNButton from '../../components/RNButton'
import { Link,Redirect,router } from 'expo-router';
import Preset from '../Preset';


const Workout = ({}) => {

    const [activeComponent, setActiveComponent] = useState('Preset');   

  return (

    <View className="bg bg-primary h-full">
    <View className="justify-around items-start flex-row mt-14">


        <RNButton mode="contained-tonal" title="Preset" style="rounded-r-lg" handlePress={() => setActiveComponent('Preset')} />  


      <RNButton mode="contained-tonal" title="Exercises" style="rounded-l-lg gap-x-44"   handlePress={() => setActiveComponent('Exercises')}/>

      </View>
      {activeComponent === 'Preset' && (
        <View className="mt-24 ">

            <Preset/>
            
        </View>
      )}
      {activeComponent === 'Exercises' && (
        <View className="mt-24">
          <Text className="text-white">This is the exercises Content</Text>
        </View>
      )} 


    

    </View>
     



     
  )
}

export default Workout