import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase";
import useStore from "../../store";
//import { saveAuthdata } from "../../api/signupData";
import SelectRole from "../../components/SelectRole";
import { useAuth } from "../../context/AuthContext";
// import { makeRedirectUri } from 'expo-auth-session'
// import * as QueryParams from 'expo-auth-session/build/QueryParams'
// import * as WebBrowser from 'expo-web-browser'
// import * as Linking from 'expo-linking'
// import { CommonActions } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const { setAuthData } = useStore();
  const { onSignup } = useAuth();

  //const navigation = useNavigation();

  // async function signUpWithEmail() {
  //   setLoading(true);
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   });

  //   const userId = session.user?.id;
  //   setAuthData({
  //     userId: userId,
  //     userName: userName,
  //     role: role,
  //   });
  //   if (error) Alert.alert(error.message);
  //   else {
  //     await saveAuthdata();
  //     // if (role === "Trainer") {
  //     //   router.replace("/UserPhoto");
  //     // }
  //     router.replace("/gender");
  //   }
  //   if (!session)
  //     Alert.alert("Please check your inbox for email verification!");
  //   setLoading(false);
  // }
  const signUpWithEmail = async () => {
    setLoading(true);
    await onSignup(email, password, userName, role);
    setLoading(false);
    router.replace("/gender");
  };

  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  const handleSelect = (value) => {
    setRole(value);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-1">
          <Image
            source={require("../../assets/l3.png")}
            className="w-[115px] h-[120px] "
            resizeMode="contain"
          />

          <Text className="text-2xl text-white font-psemibold">Sign Up</Text>

          <FormField
            title="Username"
            value={userName}
            handleChangeText={(text) => setUserName(text)}
            otherStyles="mt-5"
            placeholder="Name"
          />

          <FormField
            title="Email"
            value={email}
            handleChangeText={(text) => setEmail(text)}
            otherStyles="mt-5"
            keyboardType="email-address"
            placeholder="123@gmail.com"
          />

          <FormField
            title="Password"
            value={password}
            handleChangeText={(text) => setPassword(text)}
            otherStyles="mt-5"
            placeholder="asdfg"
          />

          {/* <View className="space-y-2 mt-7  px-4 justify-center ">
            <Text className="text-base text-gray-100 font-pmedium">
              Experience level
            </Text>

            <View className="  focus:border-orange-400 ">
              <SelectRole onSelect={handleSelect} />
            </View>
          </View> */}

          <View className="space-y-2 mt-5">
            <Text className="text-base text-gray-100 font-pmedium">Role</Text>

            <SelectRole onSelect={handleSelect} />
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={signUpWithEmail}
            containerStyles="mt-5"
            isLoading={loading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Have and account already?
            </Text>

            <Link
              href="/sign-in"
              className="text-lg text-secondary font-psemibold"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
