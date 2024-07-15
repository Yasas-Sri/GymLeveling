import { View, Text, ScrollView,Image } from 'react-native'
import React,{useState} from 'react' 
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {

 const [form,setForm] = useState({
     email:'',
     password:''
 })

 const [isSubmitting,setIsSubmitting] = useState(false)

 const submit = () =>{


 }

  return (
     <SafeAreaView className="bg-primary h-full">
         <ScrollView>
             <View className="w-full justify-center min-h-[75vh] px-4 my-5">

             <Image
               source={require('../../assets/l3.png')}
               className="w-[115px] h-[150px] "
               resizeMode="contain"
             />

             {/* <Text className="text-2xl text-white mt-10"></Text> */}
              
              <Text className="text-2xl text-white mt-2">Log in</Text>
              
              <FormField
                 title="Email"
                 value={form.email}
                 handleChangeText={(e)=> setForm({...form,email:e
                 })}
                 otherStyles="mt-7"
                 keyboardType="email-address"
              />

              <FormField
                 title="Password"
                 value={form.password}
                 handleChangeText={(e)=> setForm({...form,password:e
                 })}
                 otherStyles="mt-7"
                 
              />  
                
             <CustomButton
                title="Sign in"
                handlePress={submit}
                containerStyles="mt-7"
                isLoading={isSubmitting}
             />
               
             <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-200">Don't have account?</Text>

              <Link href="/sign-up" className="text-lg text-orange-400">Sign Up</Link>


              {/* just for checking home , dummy link remove after auth */}
              
              <Link href="/home" className="text-orange-400 text-lg" >home</Link> 


             </View>

              </View>  
         </ScrollView>
     </SafeAreaView>
  )
}

export default SignIn