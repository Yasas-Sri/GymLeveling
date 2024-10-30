import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { supabase } from "../../lib/supabase";
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

  //const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else {
      //  router.dismissAll();
      router.replace("/home");
      //     navigation.reset({
      //       index: 0,
      //       routes: [{ name: 'home' }], // your stack screen name
      //   });
    }
    setLoading(false);
    // const {
    //   data: { user },
    //   error: userError,
    // } = await supabase.auth.getUser();
    // console.log(user);
  }

  //  const [session, setSession] = useState(null)

  //   useEffect(() => {
  //     supabase.auth.getSession().then(({ data: { session } }) => {
  //       setSession(session)
  //     })

  //     supabase.auth.onAuthStateChange((_event, session) => {
  //       setSession(session)
  //     })
  //   }, [])

  //  const submit = () =>{

  //    router.push('/home')
  //  }

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

            <Link href="/home" className="text-orange-400 text-lg">
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
