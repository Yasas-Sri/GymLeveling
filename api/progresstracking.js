import { api } from "./index.js";
import useStore from "../store";
import { supabase } from "../lib/supabase";

const BASE_URL = "http://192.168.8.125:3000";

export const saveProgress = async ({ weight, fileName }) => {
  try {
    // console.log(title);
    const url = `${BASE_URL}/api/progressdata`;
    const response = await api.post(url, {
      weight,
      fileName,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};

export const getProgress = async () => {
  try {
    const { addProgress } = useStore.getState();
    const url = `${BASE_URL}/api/progressdata`;
    const response = await api.get(url);
    console.log(response);
    addProgress(response);
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
  }
};
