import { View } from "react-native";
import { Tabs } from "expo-router";
// import {icons} from '../../constants'
// import CustomIconButton from '../../components/CustomIconButton'
import { FontAwesome5 } from "@expo/vector-icons";

const TabIcon = ({ icon, color, size }) => {
  return (
    <View className="items-center justify-center gap-2">
      {/* <Image
             source={icon}
             resizeMode="center"
              tintColor={color}+01

             className= "w-6 h-6"
          />           */}

      <FontAwesome5 name={icon} size={size} color={color} />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF7E06",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#0A0A2C",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,

            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="home" color={color} size={20} />
            ),
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="calendar-alt" color={color} size={20} />
            ),
          }}
        />

        <Tabs.Screen
          name="Workout"
          options={{
            title: "Workout",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="dumbbell" color={color} size={20} />
            ),
          }}
        />

        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="user" color={color} size={20} />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="bell" color={color} size={20} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
