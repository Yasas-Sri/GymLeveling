import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const { width: viewportWidth } = Dimensions.get("window");

const Slider = ({ data }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/Workout/WorkoutPlan",
          params: { routineId: `${item.id}` },
        })
      }
    >
      <View style={styles.card}>
        <View className="flex-row justify-start">
          <Image
            source={require("../assets/l1.png")}
            className="w-[30px] h-[30px] justify-self-start flex-row"
            resizeMode="contain"
          />
          <Text className="text-gray-500">Gymleveling</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-2">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#0f0f36", //0A0A2C   1A1A51
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#363670",
    width: viewportWidth - 200,
    height: 100,
    marginHorizontal: 5,
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 10,
    color: "white",
  },
});

export default Slider;
