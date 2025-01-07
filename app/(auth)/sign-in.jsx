import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
//import { CommonActions } from '@react-navigation/native';
// import GoogleSignin from '../../components/GoogleSignin'

const SignIn = () => {
  //  const [form,setForm] = useState({
  //      email:'',
  //      password:''
  //  })

  // const [isSubmitting,setIsSubmitting] = useState(false)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin, authState } = useAuth();

  useEffect(() => {
    console.log("Auth state changed:", authState);
  }, [authState]);
  //const navigation = useNavigation();

  // async function signInWithEmail() {
  //   setLoading(true);
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });

  //   if (error) Alert.alert(error.message);
  //   else {
  //     router.replace("/home");
  //   }
  //   setLoading(false);
  // }

  const signInWithEmail = async () => {
    setLoading(true);
    await onLogin(email, password);
    setLoading(false);
    router.replace("/(tabs)/");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-5">
          <Image
            source={require("../../assets/l3.png")}
            className="w-[115px] h-[150px] "
            resizeMode="contain"
          />

          {/* <Text className="text-2xl text-white mt-10"></Text> */}

          <Text className="text-2xl text-white mt-2 font-psemibold">
            Log in
          </Text>

          <FormField
            title="Email"
            value={email}
            handleChangeText={(text) => setEmail(text)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={password}
            handleChangeText={(text) => setPassword(text)}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign in"
            handlePress={signInWithEmail}
            containerStyles="mt-7"
            isLoading={loading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Don't have account?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg text-orange-400 font-psemibold"
            >
              Sign Up
            </Link>

            {/* just for checking home , dummy link remove after auth */}

            <Link href="/gender" className="text-orange-400 text-lg">
              home
            </Link>
          </View>

          {/* <GoogleSignin/> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
