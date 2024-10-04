import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Slider from "../../../components/Slider";
import useStore from "../../../store";

//const { width: viewportWidth } = Dimensions.get('window');

// const data = [
//   { id: '1', title: 'Card 1' },
//   { id: '2', title: 'Card 2' },
//   { id: '3', title: 'Card 3' },
//   { id: '4', title: 'Card 4' },
//   { id: '5', title: 'Card 5' },
// ];

// const renderItem = ({ item }) => (
//   <View style={styles.card}>
//     {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
//     <Text style={styles.title}>{item.title}</Text>
//   </View>
// );

const Routines = () => {
  const routineData = useStore((state) => state.routineList);

  const fullBodyData = routineData.slice(0, 3);
  const UpperLowerData = routineData.slice(3, 7);
  const PPLData = routineData.slice(7, 10);
  const CalisthenicsData = routineData.slice(10, 12);
  const OnlyDumbellsData = routineData.slice(12, 14);
  const NoEquipmentData = routineData.slice(14, 16);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mt-16">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-psemibold">
            Workout Plans
          </Text>
        </View>

        <View className="mt-5">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            Full body
          </Text>
          <Slider data={fullBodyData} />
        </View>

        <View className="mt-5">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            Upper Lower
          </Text>
          <Slider data={UpperLowerData} />
        </View>

        <View className="mt-5">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            Push Pull Leg{" "}
          </Text>
          <Slider data={PPLData} />
        </View>

        <View className="mt-5">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            Calisthenics
          </Text>
          <Slider data={CalisthenicsData} />
        </View>

        <View className="mt-5">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            Only dumbells
          </Text>
          <Slider data={OnlyDumbellsData} />
        </View>

        <View className="mt-5 mb-10">
          <Text className="text-white justify-self-start flex-row m-5 text-xl font-pregular">
            No equipment
          </Text>
          <Slider data={NoEquipmentData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//   },
//   card: {
//     backgroundColor: '#0f0f36',   //0A0A2C   1A1A51
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor:'#363670',
//     width: viewportWidth - 200,
//     height:100,
//     marginHorizontal: 10,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

export default Routines;
