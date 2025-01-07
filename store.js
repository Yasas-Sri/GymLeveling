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
  saveRoutines: [], // add to save routines in preset
  addedExercises: [],
  loggedExercises: [], // exercises user logged in the finish routine
  saveBookings: [],
  fetchloggedExercises: [], // fetching logged exercises from database
  usersfetchloggedexercise: [], // trainer fetch users logged data
  fetchloggedEachExercise: [], // fetch each logged exercise
  userInfo: {
    gender: null,
    dateOfBirth: null,
    height: null,
    weight: null,
    experienceLevel: null,
  },
  imageFiles: [],
  progressimageFiles: [],
  authData: {
    userId: null,
    userName: null,
    role: null,
  },

  users: [],
  progress: [],

  userRole: "",
  userSession: {}, // add the user aken from supabse contains user id and other data of user

  addProgress: (newProgress) => set((state) => ({ progress: newProgress })),

  addUserSession: (newSession) => set((state) => ({ userSession: newSession })),

  addUsers: (newUsers) => set((state) => ({ users: newUsers })),

  addUserRole: (role) => set((state) => ({ userRole: role })),

  setAuthData: (newAuthData) =>
    set((state) => ({
      authData: { ...state.authData, ...newAuthData },
    })),

  addImage: (newImage) => set((state) => ({ imageFiles: newImage })),

  addprogressImage: (newImage) =>
    set((state) => ({ progressimageFiles: newImage })),

  setUserInfo: (newUserInfo) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...newUserInfo },
    })),

  addBooking: (newBooking) => set((state) => ({ saveBookings: newBooking })),

  addRoutine: (newRoutine) => set((state) => ({ saveRoutines: newRoutine })),

  getSaveRoutines: () => set((state) => state.saveRoutines),

  removeRoutine: (id) =>
    set((state) => ({
      saveRoutines: state.saveRoutines.filter((routine) => routine.id !== id),
    })),

  removeBooking: (id) =>
    set((state) => ({
      saveBookings: state.saveBookings.filter((booking) => booking.id !== id),
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

  //remove all the exercises chosed when cancel button is pressed
  clearAllExercises: () =>
    set(() => ({
      addedExercises: [],
    })),

  //   loggedExerciseDetails: (exerciseId, { sets, reps, weights }) =>
  //     set((state) => {
  //       // Check if the exercise already exists in the addedExercises array
  //       const existingExerciseIndex = state.loggedExercises.findIndex(
  //         (exercise) => exercise.id === exerciseId,
  //       );

  //       if (existingExerciseIndex !== -1) {
  //         // Update the existing exercise
  //         const updatedExercises = [...state.loggedExercises];
  //         updatedExercises[existingExerciseIndex] = {
  //           exerciseId,
  //           sets,
  //           reps,
  //           weights,
  //         };
  //         return { loggedExercises: updatedExercises };
  //       }

  //       // Add a new exercise if it doesn't exist in the array
  //       return {
  //         loggedExercises: [
  //           ...state.loggedExercises,
  //           { exerciseId, sets, reps, weights },
  //         ],
  //       };
  //     }),
  loggedExerciseDetails: (exerciseId, { sets, reps, weights }) =>
    set((state) => {
      // Filter out null values from reps and weights
      const filteredSets = sets.filter(
        (_, index) => reps[index] !== null && weights[index] !== null,
      );
      const filteredReps = reps.filter((rep) => rep !== null);
      const filteredWeights = weights.filter((weight) => weight !== null);

      // Check if the exercise already exists in the loggedExercises array
      const existingExerciseIndex = state.loggedExercises.findIndex(
        (exercise) => exercise.exerciseId === exerciseId,
      );

      if (existingExerciseIndex !== -1) {
        // Update the existing exercise
        const updatedExercises = [...state.loggedExercises];
        updatedExercises[existingExerciseIndex] = {
          exerciseId,
          sets: filteredSets,
          reps: filteredReps,
          weights: filteredWeights,
        };
        return { loggedExercises: updatedExercises };
      }

      // Add a new exercise if it doesn't exist in the array
      return {
        loggedExercises: [
          ...state.loggedExercises,
          {
            exerciseId,
            sets: filteredSets,
            reps: filteredReps,
            weights: filteredWeights,
          },
        ],
      };
    }),

  addFetchLoggedExercises: (exercises) =>
    set((state) => ({
      fetchloggedExercises: exercises,
    })),

  addFetchLoggedEachExercise: (exercises) =>
    set((state) => ({
      fetchloggedEachExercise: exercises,
    })),

  addUserFetchLoggedExercises: (exercises) =>
    set((state) => ({
      usersfetchloggedexercise: exercises,
    })),
}));

export default useStore;
