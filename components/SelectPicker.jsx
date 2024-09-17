import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectedTime = () => {
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <View style={styles.container}>
       <View className="border-blue-950 border-2 rounded-2xl font-pmedium"> 
      <RNPickerSelect
        onValueChange={(value) => setSelectedTime(value)}
        items={[
          { label: 'Select time', value: '' },
          { label: 'Complete beginner', value: 'beginner' },
          { label: '0-6 months', value: 'low-beginner' },
          { label: '6 months- 1 year', value: 'upper-beginner' },
          { label: '1 year- 4 year', value: 'intermediate' },
          { label: '4+ years', value: 'advanced' }
        ]}
        style={{
          inputAndroid: {
            color: 'white',              
            backgroundColor: '#0A0A2C',
            // borderColor:'#363670',      
            // borderRadius:5,   
        },
          inputIOS: {
            color: 'white',              
            backgroundColor: '#0A0A2C',
            // borderColor:'#363670',
            // borderRadius:5,     
          },
          placeholder: {
            color: 'grey',  
            // fontFamily:'Poppins-SemiBold", "sans-serif',            
            label: 'Select time',
          value: null,  
        },
        }}
        placeholder={{
          label: 'Select time',
          value: null,
          color: 'white',
        }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#0A0A2C',
    padding: 5,
    // borderRadius: 1,
    // borderColor: '#363670'
  },
});

export default SelectedTime;
