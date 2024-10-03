import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Barchart = () => {
  
   
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const shortMonth = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      
      days.push(`${shortMonth}${day}`);  
    }
    return days;
  };


  
  
  const data = {
    labels: getLast7Days(),
    datasets: [
      {
        data: [50, 80, 40, 90, 60, 100,20],
      },
    ],
  };

  // Get screen width for responsive sizing
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.header}></Text>
      <BarChart
        data={data}
        width={screenWidth- -5} // Responsive width
        height={220}
        showValuesOnTopOfBars={true}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#FF7E06', //#0A0A2C
        //   backgroundGradientFrom: '#1E2923',
        //   backgroundGradientTo: '#0A0A2C',

        backgroundColor: '#0A0A2C',  // Solid background color
         backgroundGradientFrom: '#0A0A2C',  // Gradient start
         backgroundGradientTo: '#0A0A2C',
          decimalPlaces: 0, // No decimal points
          color: (opacity = 1) => `rgba(255, 126, 6, ${opacity})`,
          labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: '#0A0A2C',
          },
        }}
       //  verticalLabelRotation={10} // Rotate x-axis labels if needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
    marginRight: 70,
    marginLeft:40,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Barchart;