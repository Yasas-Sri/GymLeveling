//import { FileObject } from "@supabase/storage-js";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

// Image item component that displays the image from Supabase Storage and a delte button
const ProgressImagesItem = ({ item, userId, progress }) => {
  const [image, setImage] = useState("");
  const [record, setRecord] = useState(null);

  console.log("item name", item.name);
  console.log("Progress fileName:", progress[0].fileName);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  //   supabase.storage
  //     .from("progress")
  //     .download(`${userId}/${item.name}`)
  //     .then(({ data, error }) => {
  //       const fr = new FileReader();
  //       fr.readAsDataURL(data);
  //       //console.log("imageItem:", data);
  //       fr.onload = () => {
  //         setImage(fr.result);
  //       };
  //     });

  useEffect(() => {
    const fetchImage = async () => {
      const { data, error } = await supabase.storage
        .from("progress")
        .download(`${userId}/${item.name}`);

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => setImage(fr.result);
      } else {
        console.error("Error downloading image:", error.message);
      }
    };

    fetchImage();
    // console.log("Item name:", item.name); // Log the current item's name
    // console.log("Progress fileName:", progress.fileName);
    // console.log("progress data", progress);
    // Find the record that matches the item's filename

    const itemNameWithoutExtension = item.name.replace(".png", "");

    // Find matching progress record by comparing names as strings without the extension
    const matchedRecord = progress.find(
      (p) => p.fileName === itemNameWithoutExtension,
    );
    setRecord(matchedRecord);
  }, [item.name, userId, progress]);

  console.log(record);
  return (
    <View
      //   style={{ flexDirection: "row", margin: 1, alignItems: "center", gap: 5 }}
      className="  m-3  border-borderB p-3 border rounded-lg"
    >
      {image ? (
        <Image className=" h-64 m-2 rounded-lg" source={{ uri: image }} />
      ) : (
        <View style={{ width: 80, height: 80, backgroundColor: "#1A1A1A" }} />
      )}

      {record && (
        <View className="p-3">
          <Text className="text-white text-lg">
            Date: {formatDate(record.record_date)}
          </Text>
          <Text className="text-white text-lg">Weight: {record.weight} kg</Text>
        </View>
      )}
    </View>
  );
};

export default ProgressImagesItem;
