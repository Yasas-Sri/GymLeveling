import { View, Text,Image } from 'react-native'
import React from 'react'

const ItemList = ({name,gifPhoto,target}) => {
  return (
    <View className="justify-start flex-row ">

      <Image 
        source ={{uri:gifPhoto}}
        // style={{ width: 50, height: 50 ,borderRadius: 25}}
         className="w-12 h-12 rounded-full" 

      /> 


      <Text className="my-0.5 rounded border-slate-600 border-solid text-white py-2 px-4 font-pregular text-xl">{name}</Text>
      {/* <Text>{target}</Text> */}
    
    </View>
  )
}

export default ItemList