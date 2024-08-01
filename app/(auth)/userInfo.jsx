import { View, Text,Pressable,Platform,TextInput } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from "@react-native-community/datetimepicker"
import FormField from '../../components/FormField'

//  import { TextInput } from 'react-native-paper'

const UserInfo = () => {

  const [date,setDate] = useState(new Date());
  const [showPicker,setShowPicker] = useState(false);

  const [dateOfBirth,setDateOfBirth] =useState("")


  const toggleDatepicker = () =>{
      setShowPicker(!showPicker)
      
  }

  const onChange = ({type},selectedDate) =>{
     if(type =="set"){
         const currentDate = selectedDate
         setDate(currentDate)
        
        if(Platform.OS==="android"){
           toggleDatepicker();
           setDateOfBirth(currentDate.toDateString())
        } 
     }
     else{
        toggleDatepicker()
     }
  }

  return (
     <SafeAreaView className="bg-primary h-full">
        <View className="space-y-2 mt-7 w-full  px-4 "> 
        <Text  className="text-base text-gray-100 font-pmedium">Date of Birth</Text>
        
        <Pressable onPress={toggleDatepicker} >
        <View className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl  focus:border-orange-400  items-center flex-row"> 
       {showPicker && (
         <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
      />
        
       )} 

      {/* {!showPicker && ( */}
     
         <TextInput
            className="flex-1 text-white text-base font-psemibold bg-primary  "
            placeholder=" Date"
            placeholderTextColor="#7b7b8b"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
             editable={false}
             onPressIn={toggleDatepicker}
            inputMode='numeric'
         />
         
      {/* ) } */}
  
       
       </View>

       </Pressable>

       </View> 

       <View className="space-y-2 mt-7 w-full px-4 justify-center "> 
        <Text  className="text-base text-gray-100 font-pmedium">Height</Text>
        
        <View className="border-2 border-blue-950 w-full h-16 px-4  rounded-2xl focus:border-orange-400 items-center flex-row"> 
     

         <TextInput
            className="flex-1 text-white text-base font-psemibold bg-primary"
            placeholder="  height"
            placeholderTextColor="#7b7b8b"
            
            
                     />
      
      
  
       
       </View>
       </View>

     </SafeAreaView>
  )
}

export default UserInfo