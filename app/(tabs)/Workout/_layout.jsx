import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const WorkoutStack = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="workout"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Exercises"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Preset"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NewRoutine"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ExploreRoutines"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="WorkoutPlan"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ExerciseData"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddExercises"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="StartRoutine"
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
