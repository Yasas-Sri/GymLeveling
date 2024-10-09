import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const WorkoutStack = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="profile"
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
