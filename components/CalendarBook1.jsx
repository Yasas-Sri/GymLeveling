import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, Modal, Button, TextInput } from "react-native";
import { Agenda, CalendarUtils } from "react-native-calendars";
import testIDs from "./testIDs";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarScreen = () => {
  const [selected, setSelected] = useState(getCurrentDate());
  const [items, setItems] = useState({
    [getCurrentDate()]: [{ name: "Meeting at 10am", height: 80 }],
    "2024-09-10": [{ name: "Doctor Appointment", height: 100 }],
  });

  const [newEvent, setNewEvent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const loadItems = (day) => {
    const newItems = { ...items };
    for (let i = -5; i <= 5; i++) {
      const time = new Date(day.timestamp + i * 24 * 60 * 60 * 1000);
      const strTime = CalendarUtils.getCalendarDateString(time);
      if (!newItems[strTime]) {
        newItems[strTime] = [];
        newItems[strTime].push({
          name: `Agenda Item for ${strTime}`,
          height: Math.max(50, Math.floor(Math.random() * 150)),
        });
      }
    }
    setItems(newItems);
  };

  const handleAddEvent = (date, eventName) => {
    if (!eventName) return;
    const newItems = { ...items };
    if (!newItems[date]) {
      newItems[date] = [];
    }
    newItems[date].push({
      name: eventName,
      height: Math.max(50, Math.floor(Math.random() * 150)),
    });
    setItems(newItems);
  };

  const renderItem = useCallback(
    (item) => (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    ),
    [],
  );

  // Open the modal to add a new event
  const openAddEventModal = (day) => {
    setSelected(day.dateString);
    setModalVisible(true);
  };

  // Memoize marked dates for performance optimization
  const markedDates = useMemo(() => {
    return {
      ...Object.keys(items).reduce((acc, key) => {
        acc[key] = { marked: true };
        return acc;
      }, {}),
      [selected]: {
        selected: true,
        selectedColor: "orange",
        selectedTextColor: "red",
      },
    };
  }, [items, selected]);

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        testID={testIDs.calendars.FIRST}
        items={items}
        minDate={"2020-01-01"}
        maxDate={"2025-12-31"}
        loadItemsForMonth={loadItems}
        selected={selected}
        onDayPress={(day) => openAddEventModal(day)}
        renderItem={renderItem}
        markedDates={markedDates}
        theme={{
          agendaDayTextColor: "blue",
          agendaDayNumColor: "red",
          agendaTodayColor: "green",
          agendaKnobColor: "blue",
        }}
      />

      {/* Modal to add an event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Add Event for {selected}</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={newEvent}
              onChangeText={setNewEvent}
            />
            <Button
              title="Add Event"
              onPress={() => {
                handleAddEvent(selected, newEvent);
                setNewEvent("");
                setModalVisible(false);
              }}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
