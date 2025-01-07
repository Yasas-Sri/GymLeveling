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

export const editProfileData = async () => {
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

export const saveAuthdata = async () => {
  try {
    const { authData } = useStore.getState();
    console.log(authData);
    const url = `${BASE_URL}/api/userAuthData`;
    const response = await api.post(url, {
      authData,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};

export const getUserRole = async () => {
  try {
    const { addUserRole } = useStore.getState();
    const url = `${BASE_URL}/api/userAuthData`;
    const response = await api.get(url);
    // console.log(response);
    addUserRole(response);
    return response;
  } catch (error) {
    console.log("api", error.message);
    //console.log(JSON.stringify(error, null, 2));
  }
};
