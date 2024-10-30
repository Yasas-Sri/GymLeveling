import { create } from "zustand";
import exerciseList from "./db.json";
import routineList from "./routines.json";

const getExMap = () => {
  const map = {};
  exerciseList.forEach((item) => {
    map[item.id] = item;
  });
  return map;
};

const exerciseMap = getExMap(exerciseList);

const useStore = create((set) => ({
  exerciseList,
  exerciseMap,
  routineList,
  // setJsonData: (newData) => set(() => ({ jsonData: newData })),
  saveRoutines: [], // add to save routines in preset
  addedExercises: [],
  loggedExercises: [],

  addRoutine: (newRoutine) => set((state) => ({ saveRoutines: newRoutine })),

  getSaveRoutines: () => set((state) => state.saveRoutines),

  removeRoutine: (id) =>
    set((state) => ({
      saveRoutines: state.saveRoutines.filter((routine) => routine.id !== id),
    })),

  // addExercise: (newExercise) =>
  //   set((state) => ({
  //     addedExercises: [...state.addedExercises, newExercise],
  //   })),

  // getAddedExercises: () => set((state) => state.addedExercises),

  // deleteExercise: (exerciseID) =>
  //   set((state) => ({
  //     addedExercises: state.addedExercises.filter(
  //       (exercise) => exercise !== exerciseID
  //     ),
  //   })),

  addExerciseDetails: (exerciseId, details) =>
    set((state) => {
      // Check if the exercise already exists in the addedExercises array
      const existingExerciseIndex = state.addedExercises.findIndex(
        (exercise) => exercise.id === exerciseId,
      );

      if (existingExerciseIndex !== -1) {
        // Update the existing exercise
        const updatedExercises = [...state.addedExercises];
        updatedExercises[existingExerciseIndex] = {
          id: exerciseId,
          sets: details.sets,
          reps: details.reps,
          weights: details.weights,
        };
        return { addedExercises: updatedExercises };
      }

      // Add a new exercise if it doesn't exist in the array
      return {
        addedExercises: [
          ...state.addedExercises,
          {
            id: exerciseId,
            sets: details.sets,
            reps: details.reps,
            weights: details.weights,
          },
        ],
      };
    }),

  removeExercise: (exerciseId) =>
    set((state) => ({
      addedExercises: state.addedExercises.filter(
        (exercise) => exercise.id !== exerciseId,
      ),
    })),

  loggedExerciseDetails: (exerciseId, { sets, reps, weights }) =>
    set((state) => {
      // Check if the exercise already exists in the addedExercises array
      const existingExerciseIndex = state.loggedExercises.findIndex(
        (exercise) => exercise.id === exerciseId,
      );

      if (existingExerciseIndex !== -1) {
        // Update the existing exercise
        const updatedExercises = [...state.loggedExercises];
        updatedExercises[existingExerciseIndex] = {
          exerciseId,
          sets,
          reps,
          weights,
        };
        return { loggedExercises: updatedExercises };
      }

      // Add a new exercise if it doesn't exist in the array
      return {
        loggedExercises: [{ exerciseId, sets, reps, weights }],
      };
    }),
}));

export default useStore;
