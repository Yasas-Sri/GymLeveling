import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="space-y-2 mt-7 w-full  px-4 ">
        <View className="items-center mb-6">
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            className="w-24 h-24 rounded-full border-4 border-white -mt-0"
          />
          <Text className="text-white text-2xl font-bold mt-4">Anik Deb </Text>
          <View className="bg-lightB p-4 rounded-lg mt-4 w-full items-center">
            <Text className="text-black text-lg">25y</Text>
            <Text className="text-black text-lg">Male</Text>
            <Text className="text-black text-lg">5.10 Feet</Text>
            <Text className="text-black text-lg">149.6 lbs</Text>
          </View>
        </View>

      

        <View className="space-y-4">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row items-center justify-between p-4 border border-gray-200 rounded-lg bg-lightB"
              onPress={() => alert(`Navigate to ${item.title}`)}
            >
              <View className="flex-row items-center">
                <Image source={item.icon} className="w-8 h-8 mr-4" />
                <Text className="text-white text-lg">{item.title}</Text>
              </View>
              <Text className="text-black text-lg">&gt;</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const menuItems = [
  { title: 'Goals'  },
  { title: 'Workout History',  },
  { title: 'Activity Tracking', },
  { title: 'Nutrition Tracking' },
  { title: 'My Body' },
  { title: 'Settings'},
];

export default Profile;