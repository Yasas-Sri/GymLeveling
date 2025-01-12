import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const WorkoutStack = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="measurements"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="addMeasurement"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#0A0A2C" style="dark" />
    </>
  );
};

export default WorkoutStack;
