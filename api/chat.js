import { supabase } from "../lib/supabase";
import { api } from "./index.js";
import useStore from "../store";

export const BASE_URL = "http://192.168.8.125:3000";

export const fetchMessagesEP = async () => {
  //   const { data, error } = await supabase
  //     .from("messages")
  //     .select("*")
  //     .order("created_at", { ascending: true });
  //   if (error) throw new Error(error.message);
  //   return data;

  try {
    const url = `${BASE_URL}/api/chat`;
    // const { addUsers } = useStore.getState();
    const response = await api.get(url);
    // console.log(response);
    // addUsers(response);
    // setResponseMessage(data.message || 'Data received successfully!');
  } catch (error) {
    // setResponseMessage('Error: ' + error.message);
    console.log(error);
  }
};

export const sendMessageEP = async (text, userId, trainerId) => {
  //   const { data, error } = await supabase
  //     .from("messages")
  //     .insert([{ sender_id: userId, receiver_id: trainerId, content: text }]);
  //   if (error) throw new Error(error.message);
  //   return data;
  try {
    //console.log("member id in frontend API", userId);
    const url = `${BASE_URL}/api/chat`;
    const response = await api.post(url, {
      text,
      userId,
      trainerId,
    });
    //console.log(response);
    // console.log(response);
    // callbacks?.onSucess?.();
  } catch (error) {
    console.log(error.message);
  }
};

export const subscribeToMessagesEP = (onMessageAdded) => {
  const subscription = supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        onMessageAdded(payload.new);
      },
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
};
