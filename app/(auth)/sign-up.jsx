import { View, Text, ScrollView,Image,Alert } from 'react-native'
import React,{useState,useEffect} from 'react' 
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link,Redirect,router,useNavigation  } from 'expo-router';
import { supabase } from '../../lib/supabase'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { CommonActions } from '@react-navigation/native';


const SignUp = () => {

//  const [form,setForm] = useState({
//      username:'',
//      email:'',
//      password:''
//  })

//  const [isSubmitting,setIsSubmitting] = useState(false)

//  const submit = () =>{


//  }

//  const routeChange= () =>{
           
//          router.push('/gender')
//  }

//  const handleClick = ()=>{
//           submit();
//           routeChange();  
//  };



 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [userName, setUserName] = useState('')
 const [loading, setLoading] = useState(false)

 const navigation = useNavigation();

 async function signUpWithEmail() {
   setLoading(true)
   const {
     data: { session },
     error,
   } = await supabase.auth.signUp({
     email: email,
     password: password,
     userName: userName,
   })

   
   if (error) Alert.alert(error.message)

   else{
    // router.dismissAll();
     router.replace('/gender')
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'home' }], // your stack screen name
  // });

   }    
   if (!session) Alert.alert('Please check your inbox for email verification!')
   setLoading(false)
   
 }


 const [session, setSession] = useState(null)

 useEffect(() => {
   supabase.auth.getSession().then(({ data: { session } }) => {
     setSession(session)
   })

   supabase.auth.onAuthStateChange((_event, session) => {
     setSession(session)
   })
 }, [])

 
 




  return (
     <SafeAreaView className="bg-primary h-full">
         <ScrollView>
             <View className="w-full justify-center min-h-[85vh] px-4 my-6">

             <Image
               source={require('../../assets/l3.png')}
               className="w-[115px] h-[120px] "
               resizeMode="contain"
             />
              
              <Text className="text-2xl text-white font-psemibold">Sign Up</Text>
              
              <FormField
                 title="Username"
                 value={userName}
                 handleChangeText={(text) => setUserName(text)}
                 otherStyles="mt-7"
                 
              />

              <FormField
                 title="Email"
                 value={email}
                 handleChangeText={(text) =>setEmail(text)}
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
                title="Sign Up"
                handlePress={signUpWithEmail}
                containerStyles="mt-7"
                isLoading={loading}
             />
             
               
             <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-200 font-pregular">Have and account already?</Text>

              <Link href="/sign-in" className="text-lg text-secondary font-psemibold">Sign in</Link>
             </View>

              </View>  
         </ScrollView>
     </SafeAreaView>
  )
}

export default SignUp