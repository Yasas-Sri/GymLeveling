import { View, Text, Image, Pressable, ScrollView,TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Barchart from '../../components/Barchart';

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView >
                                                  
                                                 {/* margin not the same   */}
      <View className="justify-between flex-row mt-2">    
        
     

        <TouchableOpacity >
        <View className="  p-4  ml-2 min-w-20 justify-center self-center">
           <Text className="text-secondary  text-base">Edit Profile</Text>      
         </View>  
        </TouchableOpacity>

       <Text className="text-white justify-items-center  self-center  font-pextrabold text-base  "></Text> 

        {/* <RNButton
          mode="contained-tonal"
          title="Save"
          style="rounded  bg-secondary mr-2 min-w-24" 
         //S handlePress={() => setActiveComponent('Exercises')}
        /> */}
         
         <TouchableOpacity >
        <View className="   p-4  mr-2  self-center justify-items-center">
           {/* <Text className=" justify-center  text-white self-center">Save</Text>       */}
           <MaterialIcons name="settings" size={30} color="grey" />
           
         </View>  
        </TouchableOpacity>

        
     

      </View>







        <View className=" flex-row  gap-4   items-center mt-2   px-4">
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            className="w-24 h-24 rounded-full border-4 border-white -mt-0"
          />

          <View>
          <Text className="text-white text-2xl font-bold ">Lan Mandragoran </Text>

          <Text className="text-white mt-1">workouts</Text>
          </View>
          
          
        </View>

      
        <View className='ml-0'>
        <Barchart/>
          

         <View className='flex-row-reverse'>
            <TouchableOpacity>
              <View className='p-4   m-2 w-fit mr-2 justify-center border-borderB border rounded-lg'>
              <Text className='space-y-2   text-white text-base'>Volume</Text>
              </View>

            </TouchableOpacity>
             

            <TouchableOpacity>
              <View className='p-4   m-2 w-fit mr-2 justify-center border-borderB border rounded-lg'>
              <Text className='space-y-2   text-white text-base'>Reps</Text>
              </View>

            </TouchableOpacity>


         </View>  

        </View>

        
    


        <View className='p-4  ml-2 mt-7 w-fit mr-2 justify-center '>
           <Text className='space-y-2   text-white font-pregular text-lg'>Workout Details</Text>

       </View>


          {/* render the workouts that done and logged */}
       <TouchableOpacity>
       <View className='p-4  ml-2 m-2 w-fit mr-2 justify-center border-borderB border rounded-lg'>
           <Text className='space-y-2   text-white text-base'>Routine title</Text>
            <Text className='text-white'>Date</Text>

       </View>

       </TouchableOpacity>

          

       <TouchableOpacity>
       <View className='p-4  ml-2 mt-2 w-fit mr-2 justify-between flex-row '>
           
          <View className="flex-row gap-2">
           <MaterialIcons name="work-history" size={30} color="white"/>
           <Text className='space-y-2   text-white text-base font-pmedium self-center'>Workout History</Text>
           </View>


           <View className="  self-center justify-items-center">
            <FontAwesome  name="angle-right" size={30} color="grey"/>
            </View>
       </View>

       </TouchableOpacity>


        <TouchableOpacity>
       <View className='p-4  ml-2  w-fit mr-2  justify-between  flex-row'>
             
            <View className="flex-row gap-2"> 
           <MaterialCommunityIcons name="food-apple" size={30} color="white"/>
           <Text className='space-y-2   text-white text-base font-pmedium self-center'>Nutrition</Text>
           </View>

           <View className="  self-center justify-items-center">
            <FontAwesome  name="angle-right" size={30} color="grey"/>
            </View>

       </View>

       </TouchableOpacity>  


        {/* <View className="space-y-4">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between p-4 border border-borderB rounded-lg bg-lightB"
             // onPress={() => alert(`Navigate to ${item.title}`)}
            >
              <View className="flex-row items-center">
                <Image source={item.icon} className="w-8 h-8 mr-4" />
                <Text className="text-white text-lg">{item.title}</Text>
              </View>
              <Text className="text-black text-lg">&gt;</Text>
            </Pressable>
          ))}
        </View> */}
         


      </ScrollView>
    </SafeAreaView>
  );
};

// const menuItems = [
//   { title: 'Goals'  },
//   { title: 'Workout History',  },
//   { title: 'Activity Tracking', },
//   { title: 'Nutrition Tracking' },
//   { title: 'My Body' },
//   { title: 'Settings'},
// ];

export default Profile;