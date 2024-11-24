import { api } from "./index.js";
import useStore from "../store";
import { supabase } from "../lib/supabase";

const BASE_URL = "http://192.168.8.125:3000";

export const saveRoutine = async ({ title, exercises }) => {
  try {
    console.log(title);
    const url = `${BASE_URL}/api/exercises`;
    const response = await api.post(url, {
      title,
      // userId: null,
      exercises,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};

export const getRoutine = async () => {
  try {
    const { addRoutine } = useStore.getState();
    const url = `${BASE_URL}/api/exercises`;
    const response = await api.get(url);
    console.log(response);
    // response.forEach((routineArray) => {
    //   addRoutine(routineArray);
    // });
    addRoutine(response);
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};

export const deleteRoutine = async ({ routineId }) => {
  // console.log({ routineId });
  const { removeRoutine } = useStore.getState();
  try {
    const url = `${BASE_URL}/api/exercises`;
    const response = await api.delete(url, {
      routineId,
    });
    // console.log(response);
    removeRoutine({ routineId });
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};

export const saveLoggedExercises = async ({ newexercises, routineId }) => {
  try {
    const url = `${BASE_URL}/api/loggedExercises`;
    const response = await api.post(url, {
      routineId,
      newexercises,
    });
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};

export const updateSavedRoutine = async ({ newexercises, routineId }) => {
  try {
    const url = `${BASE_URL}/api/updateRoutines`;
    const response = await api.post(url, {
      routineId,
      newexercises,
    });
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};

//for all logged exercises
export const getloggedExercises = async ({ dateRange, exercise }) => {
  try {
    const { addFetchLoggedExercises } = useStore.getState();
    const url = `${BASE_URL}/api/getLoggedExercises`;
    const response = await api.post(url, {
      dateRange,
      exercise,
    });
    // console.log(response);
    addFetchLoggedExercises(response.loggedExercises);
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};

//for each exercise in summary
export const getEachloggedExercise = async ({ dateRange, exercise }) => {
  try {
    const { addFetchLoggedEachExercise } = useStore.getState();
    const url = `${BASE_URL}/api/getLoggedExercises`;
    const response = await api.post(url, {
      dateRange,
      exercise,
    });
    // console.log(response);
    addFetchLoggedEachExercise(response.loggedExercises);
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};
