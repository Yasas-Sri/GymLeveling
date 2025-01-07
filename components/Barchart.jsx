import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Barchart = ({ data, flag }) => {
  // let lastNDays;
  // let totalReps;
  // useEffect(() => {
  //   lastNDays = getLastNDays(data, range);
  //   totalReps = getTotalRepsByDay(data);
  // }, [data, range]);
  // console.log(data);
  const [range, setRange] = useState(7);

  const getLastNDays = (range) => {
    const today = new Date();
    const lastNDays = [];

    for (let i = 0; i < range; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      lastNDays.push(date);
    }

    const formattedLastNDays = lastNDays.map((date) => {
      const shortMonth = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${shortMonth}${day}`;
    });

    return formattedLastNDays;
  };

  const getTotalRepsByDay = (data, range) => {
    const totalRepsByDay = {};

    const lastNDays = Array.from({ length: range }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    console.log(lastNDays);
    for (const exercise of data) {
      const date = exercise.created_at.split("T")[0];

      if (lastNDays.includes(date)) {
        if (!totalRepsByDay[date]) {
          totalRepsByDay[date] = 0;
        }
        totalRepsByDay[date] += exercise.reps;
        console.log(totalRepsByDay[date]);
      }
    }
    return lastNDays.map((date) => totalRepsByDay[date] || 0);
  };

  const getTotalVolumeByDay = (data, range) => {
    const totalVolumeByDay = {};

    const lastNDays = Array.from({ length: range }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    //console.log(lastNDays);
    for (const exercise of data) {
      const date = exercise.created_at.split("T")[0];

      if (lastNDays.includes(date)) {
        if (!totalVolumeByDay[date]) {
          totalVolumeByDay[date] = 0;
        }
        totalVolumeByDay[date] += exercise.weight;
      }
    }
    return lastNDays.map((date) => totalVolumeByDay[date] || 0);
  };

  const lastNDays = getLastNDays(range);
  const totalReps = getTotalRepsByDay(data, range);
  const totalVolume = getTotalVolumeByDay(data, range);
  // console.log(lastNDays);
  console.log("reps", totalReps);

  const chartdata = {
    labels: lastNDays,
    datasets: [
      {
        data: flag === 0 ? totalReps : totalVolume,
      },
    ],
  };

  // Get screen width for responsive sizing
  const screenWidth = Dimensions.get("window").width;

  return (
    <View styles={styles.container}>
      <BarChart
        data={chartdata}
        width={screenWidth - 12} // Responsive width
        height={220}
        showValuesOnTopOfBars={true}
        //withHorizontalLines={false}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#FF7E06", //#0A0A2C
          //   backgroundGradientFrom: '#1E2923',
          //   backgroundGradientTo: '#0A0A2C',

          //backgroundColor: '#0A0A2C',  // Solid background color
          // backgroundGradientFrom: "#0A0A2C", // Gradient start
          //backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#FF7E06",
          // backgroundGradientTo: "#0A0A2C",
          decimalPlaces: 0, // No decimal points
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 20,
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
            // stroke: "#FF7E06",
          },
        }}
        style={{
          marginHorizontal: 1,
          borderRadius: 15,
          width: "100%",
          padding: 5,
          //margin: 10,
          alignItems: "center",
          //marginTop: 20,
        }}
        //  verticalLabelRotation={10} // Rotate x-axis labels if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    alignItems: "center",

    //  marginRight: 40,
    //  marginLeft: 40,
  },
});

export default Barchart;
