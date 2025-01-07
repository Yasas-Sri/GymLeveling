import { api } from "./index.js";
import useStore from "../store";

export const BASE_URL = "http://192.168.8.125:3000";

export const getUsers = async () => {
  try {
    const url = `${BASE_URL}/api/usersData`;
    const { addUsers } = useStore.getState();
    const response = await api.get(url);
    // console.log(response);
    addUsers(response);
    // setResponseMessage(data.message || 'Data received successfully!');
  } catch (error) {
    // setResponseMessage('Error: ' + error.message);
    console.log(error);
  }
};

export const saveNutritionPlan = async ({
  title,
  breakfast,
  lunch,
  dinner,
  userId,
}) => {
  try {
    const url = `${BASE_URL}/api/nutritionPlan`;
    //const { addUsers } = useStore.getState();
    const response = await api.post(url, {
      title,
      breakfast,
      lunch,
      dinner,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveWorkoutPlan = async ({ title, exercises, userId }) => {
  try {
    console.log("member id in frontend API", userId);
    const url = `${BASE_URL}/api/workoutPlan`;
    const response = await api.post(url, {
      title,
      exercises,
      userId,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};

export const getuserloggedExercises = async ({
  dateRange,
  exercise,
  userId,
}) => {
  try {
    const { addUserFetchLoggedExercises } = useStore.getState();
    const url = `${BASE_URL}/api/usersProgress`;
    const response = await api.post(url, {
      dateRange,
      exercise,
      userId,
    });
    // console.log(response);
    addUserFetchLoggedExercises(response.loggedExercises);
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};
