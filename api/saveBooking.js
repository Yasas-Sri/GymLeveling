import { api } from "./index.js";
import useStore from "../store";

const BASE_URL = "http://192.168.8.125:3000";

export const saveSchedule = async ({ timeText, newEvent, selected }) => {
  try {
    const url = `${BASE_URL}/api/bookingdata`;
    const response = await api.post(url, {
      timeText,
      newEvent,
      selected,
    });
    // const data = await response.json();
    // setResponseMessage(data.message || 'Data received successfully!');
  } catch (error) {
    // setResponseMessage('Error: ' + error.message);
    console.log(error);
  }
};

export const getSchedule = async () => {
  try {
    const url = `${BASE_URL}/api/bookingdata`;
    const { addBooking } = useStore.getState();
    const response = await api.get(url);
    // const { setJsonData } = useStore.getState();

    //setJsonData(response);
    //  console.log(response);
    addBooking(response);
    // setResponseMessage(data.message || 'Data received successfully!');
  } catch (error) {
    // setResponseMessage('Error: ' + error.message);
    console.log(error);
  }
};

export const deleteSchedule = async ({ bookingid }) => {
  try {
    const url = `${BASE_URL}/api/bookingdata`;
    const { removeBooking } = useStore.getState();
    // const response = await api.delete(url, { date });
    // console.log(response);
    const response = await api.delete(url, {
      bookingid,
    });
    console.log(response);
    removeBooking({ bookingid });

    // setResponseMessage(data.message || 'Data received successfully!');
  } catch (error) {
    // setResponseMessage('Error: ' + error.message);
    console.log(error);
  }
};
