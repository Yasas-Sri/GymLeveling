import { View } from "react-native";
import { Tabs } from "expo-router";
// import {icons} from '../../constants'
// import CustomIconButton from '../../components/CustomIconButton'
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

//console.log(Role);

const TabIcon = ({ icon, color, size }) => {
  // console.log(Role);
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
  const { authState, Role } = useAuth();
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
          name="index"
          options={{
            title: "home",
            headerShown: false,

            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="home" color={color} size={20} />
            ),
          }}
        />

        <Tabs.Screen
          name="schedule"
          options={{
            title: "schedule",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="calendar-alt" color={color} size={20} />
            ),
          }}
          redirect={authState?.role !== "Member"}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: "users",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="users" color={color} size={20} />
            ),
          }}
          redirect={authState?.role !== "Trainer"}
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
          redirect={authState?.role !== "Member"}
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
          // redirect={authState?.authenticated === null}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "notifications",
            headerShown: false,
            tabBarIcon: ({ icon, color, size }) => (
              <TabIcon icon="bell" color={color} size={20} />
            ),
          }}
          redirect={authState?.role !== "Member"}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
