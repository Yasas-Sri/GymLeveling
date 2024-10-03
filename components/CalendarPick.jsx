import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, Modal, TextInput, Button,FlatList, SafeAreaView,TouchableOpacity,Platform } from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import testIDs from './testIDs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { deleteSchedule, getSchedule, saveSchedule } from '../api/saveBooking';

import useStore from '../store';


// Function to get today's date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CalendarPick = () => {
  const currentDate = getCurrentDate(); // Get the current date
  const [selected, setSelected] = useState(currentDate); // Set the initial date to today's date
  const [currentMonth, setCurrentMonth] = useState(currentDate); // Set the current month to today's date
  const [events, setEvents] = useState({}); // State to store events for each date
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [newTime, setNewTime] = useState('');


 //////////////////////////


  const [time, setTime] = useState(new Date()); // State to store selected time
  const [showPicker, setShowPicker] = useState(false); // State to control picker visibility
  const [timeText, setTimeText] = useState(''); // State to display selected time in TextInput


  const { jsonData, setJsonData } = useStore(); // zustand store


  // Function to handle time change
  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === 'ios'); // For iOS, the picker stays open
    setTime(currentTime); // Update the time state

    // Format the time and update the TextInput field
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
  const saveEvent = () => {
    const eventForDate = events[selected] || []; // Get existing events for the date or empty array
    const updatedEvents = {
      ...events,
      [selected]: [...eventForDate, { name: newEvent, time:timeText }],
    };
    setEvents(updatedEvents); // Update events state
    setNewEvent(''); // Reset input fields
    setNewTime('');
    setTimeText('');
    setModalVisible(false); // Hide modal
    // <BookData bookData={{time,newEvent}} URL={'http://192.168.8.125:3000/api/dataRN'}/>
    saveSchedule({ timeText , newEvent,selected })
    //const getdata = getSchedule();
    getSchedule();
    // setJsonData(getdata);
     
  };

  // Marked dates logic
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#FF7E06',
        selectedTextColor: 'white',
      },
    };
  }, [selected]);

  // Render events below the calendar
//   const renderEventsForSelectedDate = () => {
//     return (
//       <View style={styles.eventList}>
//         <Text style={styles.eventTitle}>Events for {selected}:</Text>
//         {events[selected] ? (
//           events[selected].map((event, index) => (
//             <View key={index} style={styles.eventItem}>
//               <Text>{event.name} at {event.time}</Text>
//             </View>
//           ))
//         ) : (
//           <Text>No events for this day.</Text>
//         )}
//       </View>
//     );
//   };


   //delete function

  //  const handleDeleteItem = (item,index) =>{
  //         const prevData = Object.keys(events)
  //         const updatedData = prevData.filter((item)=>item.index!== index)
  //         setEvents(updatedData);

  //  }
   
  const deleteEvent = (date, index) => {
    const eventForDate = events[date];
    const updatedEvents = eventForDate.filter((_, i) => i !== index); // Remove the event by index
    setEvents((prevEvents) => {
      if (updatedEvents.length === 0) {
        const newEvents = { ...prevEvents };
        delete newEvents[date]; // Remove the date if there are no events left for that day
        deleteSchedule({date});
        return newEvents;
      }
      return { ...prevEvents, [date]: updatedEvents };
    });
  };





   




   // Render all events for all dates using FlatList
   const renderEventItem = ({ item,index,date }) => {
    return (
      <View className="bg-cardB border-2 min-w-full mb-5 border-borderB ">
        <Text className="text-white px-2.5 py-1 ">{item.name} - {item.time}</Text>
        <View className="h-10 rounded-b-lg px-2.5 py-1">
      
          <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f0f36',     //#FF7E06=secondary  #363670-borderB  
        padding: 1,
        borderRadius: 5,
        marginBottom:10,
        height:30,
        size:50,
        borderColor:'white',
        borderbottomleftradius: 8,
        borderbottomrightradius: 8,
       }}
        onPress={() => deleteEvent(date,index)}    //
    >
       <FontAwesome5 name="trash" size={15} color="white" />
       {/* <Text style={{ color: '#fff', marginLeft: 10 }}>Delete</Text> */}
    </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAllEvents = () => {
    const allDates = Object.keys(events); // Get all dates with events

    if (allDates.length === 0) {
      
      return <Text className="text-white  bg-cardB    space-y-2 mt-7   px-4 ">No bookings</Text>;
      
    }

    return (
      <View className="w-60 h-50  px-2.5 py-1 mx-0.5 my-0.5 ">
        {allDates.map((date) => (
          <View key={date} className="min-w-full" >
            <Text className="bg-cardB min-w-full text-white rounded-t-lg px-2.5 py-1 border-x-2 border-t-2 border-borderB ">{date}</Text>
            <FlatList
              data={events[date]}
              renderItem={({ item, index }) => renderEventItem({ item, index, date })}
              keyExtractor={(item, index) => `${date}-${index}`}
              scrollEnabled={false}
              
           
           />
          </View>
        ))}
      </View>
    );
  };



  return (

     <SafeAreaView className="min-h-[85vh]">
     <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER} >
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
             monthTextColor:'#FF7E06',
             arrowColor:'white',
             calendarBackground:'#0f0f36',
             dayTextColor:'white',
             textInactiveColor:'grey',
             textSectionTitleColor:'#FF7E06',
             textDayFontWeight:'bold',
             textDisabledColor:'grey',
          }}
        />
        {/* {renderEventsForSelectedDate()} */}
        <Text className=" space-y-2  font-pmedium  px-4">
        {renderAllEvents()} {/* Render all events */}
        </Text>     
      </Fragment>

      {/* Modal for adding new event  //#00000080*/}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View  style={styles.modalContainer}> 
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
            <Button title="Cancel" color="#FF7E06" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>

    </SafeAreaView>
  );
};

export default CalendarPick;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
    backgroundColor:'#0f0f36',
    borderColor:'#363670',
    borderRadius: 20,
    borderWidth: 1,
    flex:1,
    marginLeft:5,
    marginRight:5,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  eventList: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
  
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  eventItem: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#363670',
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    
  },
  modalContent: {
    width: 300,
    padding: 20,
    
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#363670',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
});