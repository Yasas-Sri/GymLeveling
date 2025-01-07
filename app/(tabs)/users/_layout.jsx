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
          name="nutritionPlan"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="workoutPlan"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="addExercises"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="progress"
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
