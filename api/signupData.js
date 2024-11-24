import { api } from "./index.js";
import useStore from "../store";
import { supabase } from "../lib/supabase";

const BASE_URL = "http://192.168.8.125:3000";

export const saveSignupdata = async () => {
  try {
    const { userInfo } = useStore.getState();
    const url = `${BASE_URL}/api/userSignupData`;
    const response = await api.post(url, {
      userInfo,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};
