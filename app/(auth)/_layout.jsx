//import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Authlayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gender"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="userInfo"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UserPhoto"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#0A0A2C" style="dark" />
    </>
  );
};

export default Authlayout;
