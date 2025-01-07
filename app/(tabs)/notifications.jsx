import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
//import { startChat } from "../../api.js";
import { BASE_URL } from "../../api/trainer.js";
import { getAuthHeaders } from "../../api/index.js";

const ChatbotScreen = () => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  // Initialize chat with a predefined history
  //   const initializeChat = async () => {
  //     const initialChat = startChat([
  //       {
  //         role: "user",
  //         parts: [{ text: "Hello " }],
  //       },
  //       {
  //         role: "model",
  //         parts: [{ text: "Hello gym bro. What would you like to know?" }],
  //       },
  //     ]);

  //     setChat(initialChat);
  //     setMessages([
  //       // { id: 1, role: "user", content: "Hello" },
  //       {
  //         id: 1,
  //         role: "assistant",
  //         content: "Hello gym bro. What would you like to know?",
  //       },
  //     ]);
  //   };

  //   initializeChat();
  // }, []);

  useEffect(() => {
    const initializeChat = () => {
      setMessages([
        // {
        //   role: "user",
        //   content: "Hello ",
        // },
        // { id: 1, role: "user", content: "Hello, Goku Ai!" },
        // {
        //   id: 2,
        //   role: "assistant",
        //   content: "Hello there gym bro. What would you like to know?",
        // },
      ]);
      //  setMessages([]);
    };

    initializeChat();
  }, []);

  // const handleSend = async () => {
  //   if (!input.trim() || !chat) return;
  //   Keyboard.dismiss();
  //   const userMessage = { id: Date.now(), role: "user", content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");

  //   setIsLoading(true);
  //   try {
  //     const result = await chat.sendMessage(input);
  //     const botMessage = {
  //       id: Date.now() + 1,
  //       role: "assistant",
  //       content: result.response.text(),
  //     };

  //     setMessages((prev) => [...prev, botMessage]);
  //   } catch (error) {
  //     console.error("Error interacting with Gemini API:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now() + 1,
  //         role: "assistant",
  //         content: "Error occurred. Please try again.",
  //       },
  //     ]);
  //   } finally {
  //     setIsLoading(false); // Hide loader
  //   }
  // };

  const handleSend = async () => {
    if (!input.trim()) return;

    Keyboard.dismiss(); // Hide the keyboard when sending a message

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsLoading(true); // Show loader

    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}/api/geminiChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          history: messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling the backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const updatedMessages = messages.toSpliced(0, 0, {
    id: "initial",
    content: "Hello Gymbro What can i do for you? ",
  });

  return (
    <View className="bg-primary h-full  flex-1 p-2">
      <Text className=" text-gray-500 text-center mt-8 mb-3">Goku AI</Text>
      <FlatList
        data={
          isLoading
            ? [...updatedMessages, { id: "loader", role: "loading" }]
            : updatedMessages
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.role === "loading" ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF7E06" />
            </View>
          ) : (
            <View
              // style={[
              //   styles.messageContainer,
              //   item.role === "user" ? styles.userContainer : styles.botContainer,
              // ]}
              className={` gap-1 ${item.role === "user" ? " flex-row-reverse" : "flex-row flex-start"}`}
            >
              <Image
                source={
                  item.role === "user"
                    ? require("../../assets/user.png") // Replace with user photo path
                    : require("../../assets/Goku.jpg")
                }
                // style={styles.avatar}
                style={[
                  styles.avatar,
                  item.role === "user" ? styles.userAvatar : styles.botAvatar,
                ]}
              />
              <View
                style={[
                  styles.message,
                  item.role === "user" ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text className="text-white">{item.content}</Text>
              </View>
            </View>
          )
        }
      />
      {/* {isLoading && (
        <ActivityIndicator size="large" color="#FF7E06" style={styles.loader} />
      )} */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#7b7b8b"
        />
        <Button title="Send" color="#FF7E06" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: "#f5f5f5" },
  message: {
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    maxWidth: "75%",
    flexShrink: 1,
  },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#FF7E06" },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#0f0f36",
    borderColor: "#363670",
    borderWidth: 1,
    color: "white",
    textDecorationColor: "white",
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#363670",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color: "white",
  },
  loader: {
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  userContainer: {
    justifyContent: "flex-end",
    // flexDirection: "row-reverse",
  },
  botContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userAvatar: {
    // borderColor: "#FF7E06",
    // borderWidth: 2, // Add a border to differentiate
    width: 40,
    height: 40,
    // alignSelf: "flex-end",
  },
  botAvatar: {
    // borderColor: "#e6e6e6",
    // borderWidth: 2, // Add a different border
    width: 40,
    height: 40,
  },
  loadingContainer: {
    alignSelf: "flex-start", // Align where bot messages appear
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatbotScreen;
