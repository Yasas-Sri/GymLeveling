//import { FileObject } from "@supabase/storage-js";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { useState } from "react";

// Image item component that displays the image from Supabase Storage and a delte button
const ImageItem = ({ item, userId }) => {
  const [image, setImage] = useState("");
  //console.log("inside imageItem");

  supabase.storage
    .from("images")
    .download(`${userId}/${item.name}`)
    .then(({ data, error }) => {
      const fr = new FileReader();
      fr.readAsDataURL(data);
      //console.log("imageItem:", data);
      fr.onload = () => {
        setImage(fr.result);
      };
    });
  // .catch((error) => {
  //   console.error("An unexpected error occurred:", error.message);
  // });

  return (
    <View
      //   style={{ flexDirection: "row", margin: 1, alignItems: "center", gap: 5 }}
      className="rounded-full w-14 h-14 mb-5 overflow-hidden"
    >
      {image ? (
        <Image className="w-14 h-14" source={{ uri: image }} />
      ) : (
        <View style={{ width: 80, height: 80, backgroundColor: "#1A1A1A" }} />
      )}
    </View>
  );
};

export default ImageItem;
