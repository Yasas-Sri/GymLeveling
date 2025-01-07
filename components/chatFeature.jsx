import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { supabase } from "../lib/supabase"; // Adjust to the correct path for your Supabase client
import { sendMessageEP } from "../api/chat";

const ChatScreen = ({ userId, trainerId }) => {
  const [messages, setMessages] = useState([]);

  // Fetch initial messages from Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("created_at", { ascending: false }); // Fetch user's messages sorted by newest first

      if (error) throw error;

      setMessages(
        data.map((msg) => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.created_at),
          user: { _id: msg.sender_id },
        })),
      );
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  // Subscribe to new messages in real time
  const subscribeToMessages = useCallback(() => {
    const subscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
              _id: newMessage.id,
              text: newMessage.content,
              createdAt: new Date(newMessage.created_at),
              user: { _id: newMessage.sender_id },
            }),
          );
        },
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  // Send a message
  const sendMessage = async (text) => {
    try {
      const { error } = await sendMessageEP({ text, userId, trainerId });
      //   {
      //     sender_id: userId,
      //     receiver_id: trainerId,
      //     content: text,
      //   },
      // ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  // Called when the user sends a message in GiftedChat
  const handleSend = async (newMessages = []) => {
    const message = newMessages[0];
    await sendMessage(message.text);
  };

  // Initial fetch and subscription setup
  useEffect(() => {
    fetchMessages();
    const unsubscribe = subscribeToMessages();
    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{ _id: userId }}
    />
  );
};

export default ChatScreen;
