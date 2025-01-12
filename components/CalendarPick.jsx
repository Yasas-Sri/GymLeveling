import React, {
  useState,
  Fragment,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Modal,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import testIDs from "./testIDs";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomButton from "./CustomButton";

import { deleteSchedule, getSchedule, saveSchedule } from "../api/saveBooking";
import { PaperProvider } from "react-native-paper";
import useStore from "../store";

// Function to get today's date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarPick = () => {
  const formatData = (data) => {
    const result = {};

    data.forEach((item) => {
      // Format the time to 12-hour format with AM/PM
      const time = new Date(
        `1970-01-01T${item.booked_time}`,
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Add the date entry as a key with an array of events, along with the id
      result[item.booked_date] = [
        {
          name: item.event,
          time,
        },
      ];

      // Add the id separately in each entry
      result[item.booked_date].id = String(item.id);
    });

    return result;
  };
  // const formatData = (data) => {
  //   const result = {};

  //   data.forEach((item) => {
  //     // Format the time to 12-hour format with AM/PM
  //     const time = new Date(
  //       `1970-01-01T${item.booked_time}`,
  //     ).toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     });

  //     // Create the event object including the id
  //     const eventObj = {
  //       id: String(item.id), // Ensure id is a string
  //       date: item.booked_date, // Keep track of the date
  //       name: item.event,
  //       time,
  //     };

  //     // Store the event in the result using its id
  //     result[item.id] = eventObj;
  //   });

  //   return result;
  // };

  const currentDate = getCurrentDate(); // Get the current date
  const [selected, setSelected] = useState(currentDate); // Set the initial date to today's date
  const [currentMonth, setCurrentMonth] = useState(currentDate); // Set the current month to today's date
  const [events, setEvents] = useState({}); // State to store events for each date
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [newTime, setNewTime] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false); // deleting booking
  //////////////////////////
  const saveBookings = useStore((state) => state.saveBookings);
  const formattedData = formatData(saveBookings);

  const [time, setTime] = useState(new Date()); // State to store selected time
  const [showPicker, setShowPicker] = useState(false); // State to control picker visibility
  const [timeText, setTimeText] = useState(""); // State to display selected time in TextInput
  const [id, setId] = useState(); // set booking id
  const [isLoading, setIsLoading] = useState(false);

  console.log(saveBookings);
  // console.log(saveBookings);
  // const addBooking = useStore((state) => state.addBooking);

  // Function to handle time change
  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === "ios"); // For iOS, the picker stays open
    setTime(currentTime); // Update the time state

    // Format the time and update the TextInput field
    const formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTimeText(formattedTime); // Update the displayed time
  };

  // Function to show the time picker when TextInput is pressed
  const showTimepicker = () => {
    setShowPicker(true);
  };

  /////////////

  // Function to handle date click and open modal
  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    setModalVisible(true); // Show modal for input
  }, []);

  // Function to save the event
  const saveEvent = async () => {
    const eventForDate = events[selected] || []; // Get existing events for the date or empty array
    const updatedEvents = {
      ...events,
      [selected]: [...eventForDate, { name: newEvent, time: timeText }],
    };
    //addBooking(events);
    //console.log(events);
    setEvents(updatedEvents); // Update events state
    setNewEvent(""); // Reset input fields
    setNewTime("");
    setTimeText("");
    // Hide modal
    // <BookData bookData={{time,newEvent}} URL={'http://192.168.8.125:3000/api/dataRN'}/>
    await saveSchedule({ timeText, newEvent, selected });
    //const getdata = getSchedule();
    getSchedule();
    setModalVisible(false);
    // setJsonData(getdata);
  };

  // Marked dates logic
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#FF7E06",
        selectedTextColor: "white",
      },
    };
  }, [selected]);

  const deleteEvent = async (id) => {
    setIsLoading(true);
    const bookingid = id.id;
    await deleteSchedule({ bookingid });
    await getSchedule();
    setModalVisible1(false);
    setIsLoading(false);
  };

  const renderItem = ({ item }) => {
    //console.log(item.id);
    return (
      <View className=" bg-cardB border-borderB border p-4 rounded-2xl mt-1 mb-5 w-full ">
        <View className=" justify-between">
          <View className="flex-row gap-x-2">
            <View className="flex-1">
              <Text className="text-white text-base ">{item.booked_date}</Text>
            </View>

            <View className="flex-row-reverse gap-20">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible1(true);
                  setId(item.id);
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>

              {/* <FontAwesome5 name="building" color="grey" size={40} /> */}
            </View>
          </View>
          <View className="flex-row gap-5">
            <View className="flex-row ">
              <Text className="text-white text-base font-pmedium ">
                {item.event} -{" "}
              </Text>
              <Text className="text-white text-base font-pmedium">
                {item.booked_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="min-h-[85vh]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        testID={testIDs.calendars.CONTAINER}
      >
        <Fragment>
          <Calendar
            testID={testIDs.calendars.FIRST}
            enableSwipeMonths
            current={currentMonth} // Use dynamic current month
            minDate={currentDate} // Restrict selection to current date and onwards
            style={styles.calendar}
            onDayPress={onDayPress}
            markedDates={marked}
            theme={{
              monthTextColor: "#FF7E06",
              arrowColor: "white",
              calendarBackground: "#0f0f36",
              dayTextColor: "white",
              textInactiveColor: "grey",
              textSectionTitleColor: "#FF7E06",
              textDayFontWeight: "bold",
              textDisabledColor: "grey",
            }}
          />
          <FlatList
            data={saveBookings}
            // keyExtractor={(item, index) =>
            //   item.id ? item.id.toString() : index.toString()
            // }
            //keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
          {/* {renderEventsForSelectedDate()} */}
          {/* <Text className=" space-y-2  font-pmedium  px-4">
            {renderAllEvents()} 
          </Text> */}
        </Fragment>

        {/* Modal for adding new event  //#00000080*/}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Gym day"
                value={newEvent}
                onChangeText={setNewEvent}
                style={styles.input}
              />
              {/* <TextInput
              placeholder="Time (e.g., 10:00 AM)"
              value={newTime}
              onChangeText={setNewTime}
              style={styles.input}
          
            /> */}

              <TouchableOpacity onPress={showTimepicker}>
                <TextInput
                  value={timeText} // Display the selected time
                  placeholder="Select Time"
                  editable={false} // Prevent manual editing, picker will handle input
                  style={styles.input}
                />
              </TouchableOpacity>

              {/* Time picker modal */}
              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  is24Hour={false}
                  onChange={onChange} // Handle time selection
                />
              )}

              {/*  */}

              <View className="mb-2 ">
                <Button title="Book" color="#0f0f36" onPress={saveEvent} />
              </View>
              <View className="mb-2 ">
                <Button
                  title="Cancel"
                  color="#FF7E06"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
        {/* modal for deleting booking */}
        <Modal visible={modalVisible1} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible1("false")}>
            <View style={styles.modalContainer1}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent1}>
                  <View className="mb-2     w-full   ">
                    <Button
                      title="Delete Routine"
                      color="#0f0f36"
                      onPress={() => deleteEvent({ id })}
                      disabled={isLoading}
                      //className={isLoading ? "opacity-50" : "#0f0f36"}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarPick;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
    backgroundColor: "#0f0f36",
    borderColor: "#363670",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  text: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "lightgrey",
    fontSize: 16,
  },
  eventList: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#363670",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,

    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#363670",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  modalContainer1: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent1: {
    // width: 300,
    width: "100%",
    padding: 20,

    backgroundColor: "white",
    //borderRadius: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17,17,79,0.5)", // 10 10 44
  },
});
