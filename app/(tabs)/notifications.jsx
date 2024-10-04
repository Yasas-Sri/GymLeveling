// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';

// const notifications = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://192.168.8.125:3000/api/dataRN');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <View className="flex-1 justify-start items-center mt-10">
//       <Text className="text-2xl">{data ? data.message : 'No data available'}</Text>
//     </View>
//   );
// };

// export default notifications;

import React from "react";

import useStore from "../../store";

import { View } from "react-native";

//import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const notifications = () => {
  //   const [responseMessage, setResponseMessage] = useState('');

  //   const sendData = async () => {
  //     try {
  //       const response = await fetch('http://192.168.8.125:3000/api/dataRN', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: 'John Doe',
  //           email: 'john.doe@example.com',
  //         }),
  //       });

  //       const data = await response.json();
  //       setResponseMessage(data.message);
  //     } catch (error) {
  //       setResponseMessage('Error: ' + error.message);
  //     }
  //   };

  // store starts here
  // const jsonData = useStore((state) => state.jsonData);

  return (
    <View className="flex-1 justify-start items-center mt-10">
      {/* <Button title="Send Data" onPress={sendData} /> */}
      {/* <Text>{responseMessage}</Text> */}
      {/* <Text>
       
       {jsonData ? JSON.stringify(jsonData, null, 2) : 'No data available'}
        </Text> 
      */}
    </View>
  );
};
// store ends

export default notifications;

///
// map = {};
// array.forEach((item) => {
//   map[item.id] = item;
// })
