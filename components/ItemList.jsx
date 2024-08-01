import { View, Text,Image } from 'react-native'
import React from 'react'

const ItemList = ({name,gifPhoto,target}) => {
  return (
    <View className="justify-start flex-row ">
      
      <View className="rounded-full">
      <Image 
        source ={{uri:gifPhoto}}
        // style={{ width: 50, height: 50}}
         className="w-14 h-14"
      /> 
       </View>

      <Text className="my-0.5 rounded border-slate-600 border-solid text-white py-2 px-4 font-pregular text-xl capitalize">{name}</Text>
      {/* <Text>{target}</Text> */}
    
    </View>
  )
}

export default ItemList