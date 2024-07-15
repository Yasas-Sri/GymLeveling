import { View, Text } from 'react-native'
import React from 'react'
import RNButton from '../components/RNButton'
import { Link,Redirect,router } from 'expo-router';

const WorkoutButton = () => {
  return (
       
    <View className="bg bg-primary h-full">
    <View className="justify-around items-start flex-row mt-14">


        <RNButton mode="contained-tonal" title="Preset" style="rounded-r-lg" handlePress={() => router.push('/workout')} />  


      <RNButton mode="contained-tonal" title="Exercises" style="rounded-l-lg gap-x-44"   handlePress={() => router.push('/Exercises')}/>


</View>

</View>
  )
}

export default WorkoutButton