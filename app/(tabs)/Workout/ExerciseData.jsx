import { View, Text, ScrollView,SafeAreaView,Image ,StyleSheet } from 'react-native'
import React from 'react'
import { Link,Redirect,router,route,useLocalSearchParams } from 'expo-router';
import useStore from '../../../store';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { s, vs, ms } from 'react-native-size-matters';


const ExerciseData = () => {

    const { exerciseId, exerciseName } = useLocalSearchParams()

    const exercises = useStore((state) => state.exerciseMap);

    
    const tableHead = ['Body Part', 'Target', 'Equipment'];
  const tableData = [
    [exercises[exerciseId].bodyPart, exercises[exerciseId].target, exercises[exerciseId].equipment],
    
  ];


  return (
    <SafeAreaView  className="bg-primary h-full">
       <ScrollView  contentContainerStyle={{ paddingBottom: 100 }}>
          
       <View className=" justify-center   min-h-[75vh] w-full mt-10">
         
         {/* <View className=" bg-white  w-full h-2/3 overflow-hidden justify-center self-center"> */}
            <Image
             source = {{uri:exercises[exerciseId].gifUrl}}
              className="w-fit h-2/3 "  
             />

         {/* </View> */}
          
             
         <Text className="text-white text-base font-pmedium justify-center self-center mt-5"> {exercises[exerciseId].name}</Text>  

     


      <View className="flex-row  ">
             <View className=" ">
              <Text className=" text-base  mt-5 ml-3   px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">Body Part</Text>
              <Text className=" text-base  mt-2 ml-3 px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">Target</Text>
              <Text className=" text-base  mt-2 ml-3 px-4 py-4  border-borderB border bg-lightB font-pregular text-gray-400">Equipment</Text>
             
             </View>
         
         <View className=" mr-3 flex-1" >
            <Text className="text-white text-base  mt-5 px-4 py-4  border-borderB border font-pregular bg-cardB" > {exercises[exerciseId].bodyPart}</Text>
             <Text className="text-white text-base  mt-2 px-4 py-4  border-borderB border font-pregular bg-cardB"> {exercises[exerciseId].target}</Text>
             <Text className="text-white text-base   mt-2 px-4 py-4  border-borderB border font-pregular bg-cardB"> {exercises[exerciseId].equipment}</Text>
         </View>

         
      
      </View>


        {/* <Table borderStyle={styles.border}>
          
          <Row data={tableHead} style={styles.header}  />
          
          <Rows data={tableData} style={styles.text} />
        </Table> */}




    </View>

       </ScrollView>


    </SafeAreaView>
  )
}

export default ExerciseData


const styles = StyleSheet.create({
    border: { borderWidth: 1, borderColor: '#ccc', margin:10 },
    header: { height: 40, backgroundColor: '#f1f8ff', textAlign: 'center',alignSelf:'center',justifyContent:'center'},
    text: { height: 40, backgroundColor: 'white', textAlign: 'center', alignSelf:'center',justifyContent:'center', textcolor:'white'},
  });