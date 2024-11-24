import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { LineChart } from "react-native-chart-kit";

const Linechart = ({ data, flag }) => {
  console.log("renderingChart");
  //   const [totalRepsIntervals, setTotalRepsIntervals] = useState([]);
  //   const [totalVolumeIntervals, setTotalVolumeIntervals] = useState([]);
  //   const [dateRanges, setDateRanges] = useState([]);
  console.log(data);
  const getTotalRepsInIntervals = (data) => {
    // setTotalReps([]);
    const totalRepsInIntervals = [];
    console.log(totalRepsInIntervals);
    const daysPerInterval = 6;
    const totalIntervals = 5;

    // Generate the last 30 days' dates from today
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    // Calculate reps for each 5-day interval
    for (let i = 0; i < totalIntervals; i++) {
      const intervalStart = i * daysPerInterval;
      const intervalEnd = intervalStart + daysPerInterval;
      const intervalDays = last30Days.slice(intervalStart, intervalEnd);

      // Sum the reps for this interval
      const intervalReps = data.reduce((total, exercise) => {
        const exerciseDate = exercise.created_at.split("T")[0];
        if (intervalDays.includes(exerciseDate)) {
          return total + exercise.reps;
        }
        return total;
      }, 0);

      totalRepsInIntervals.push(intervalReps);
    }
    console.log(totalRepsInIntervals);
    return totalRepsInIntervals;
  };

  const getTotalWeightsInIntervals = (data) => {
    const totalWeightsInIntervals = [];
    const daysPerInterval = 6;
    const totalIntervals = 5;

    // Generate the last 30 days' dates from today
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });

    // Calculate reps for each 5-day interval
    for (let i = 0; i < totalIntervals; i++) {
      const intervalStart = i * daysPerInterval;
      const intervalEnd = intervalStart + daysPerInterval;
      const intervalDays = last30Days.slice(intervalStart, intervalEnd);

      // Sum the reps for this interval
      const intervalReps = data.reduce((total, exercise) => {
        const exerciseDate = exercise.created_at.split("T")[0];
        if (intervalDays.includes(exerciseDate)) {
          return total + exercise.weight;
        }
        return total;
      }, 0);

      totalWeightsInIntervals.push(intervalReps);
    }

    return totalWeightsInIntervals;
  };

  const getDateRangesForIntervals = () => {
    const daysPerInterval = 6;
    const totalIntervals = 5;
    const dateRanges = [];

    // Generate the last 30 days' dates from today
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    });

    // Generate date ranges for each 5-day interval
    for (let i = 0; i < totalIntervals; i++) {
      const intervalStart = i * daysPerInterval;
      const intervalEnd = intervalStart + daysPerInterval - 1;

      const startDate = last30Days[intervalEnd];
      const endDate = last30Days[intervalStart];

      const startLabel = `${startDate.toLocaleString("default", { month: "short" })}${startDate.getDate()}`;
      const endLabel = `${endDate.toLocaleString("default", { month: "short" })}${endDate.getDate()}`;

      dateRanges.push(`${startLabel}-${endLabel}`);
    }

    return dateRanges;
  };

  //   const totalRepsIntervals = getTotalRepsInIntervals(data);
  //   const totalVolumeIntervals = getTotalWeightsInIntervals(data);
  //   const dateRanges = getDateRangesForIntervals();
  const totalRepsIntervals = useMemo(
    () => getTotalRepsInIntervals(data),
    [data],
  );
  const totalVolumeIntervals = useMemo(
    () => getTotalWeightsInIntervals(data),
    [data],
  );
  const dateRanges = useMemo(() => getDateRangesForIntervals(), []);

  console.log("Total Reps in Intervals:", totalRepsIntervals);
  console.log("Date Ranges:", dateRanges);

  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <LineChart
        data={{
          labels: dateRanges,
          datasets: [
            {
              data: flag === 0 ? totalRepsIntervals : totalVolumeIntervals,
            },
          ],
        }}
        width={screenWidth - 12} // from react-native
        height={220}
        yAxisLabel=""
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        // verticalLabelRotation={10}
        chartConfig={{
          backgroundColor: "#FF7E06",
          //backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#FF7E06",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 20,
          },
          propsForDots: {
            // r: "6",
            // strokeWidth: "0",
            // stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          // marginVertical: 15,
          // borderRadius: 15,
          // margin: 12,
          marginHorizontal: 1,
          borderRadius: 15,
          width: "100%",
          padding: 5,
          //margin: 10,
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default Linechart;
