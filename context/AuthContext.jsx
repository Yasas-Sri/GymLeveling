import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { createClient } from "@supabase/supabase-js";
import { getUserRole } from "../api/signupData";
import useStore from "../store";
import { saveAuthdata } from "../api/signupData";
import { Link, router } from "expo-router";
// Set up Supabase client (ensure this file is in your lib folder)
//const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");
import { supabase } from "../lib/supabase";
// Enum-like object for Role
// const Role = {
//   ADMIN: "admin",
//   USER: "user",
// };

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { setAuthData } = useStore();
  const [Role, setRole] = useState("");
  const [authState, setAuthState] = useState({
    authenticated: null,
    email: null,
    role: null,
  });

  // Track the user session from Supabase
  useEffect(() => {
    // const session = supabase.auth.session();
    // if (session) {
    //   fetchUserRole(session.user);
    // }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          fetchUserRole(session.user);
        } else {
          setAuthState({
            authenticated: false,
            email: null,
            role: null,
          });
        }
      },
    );

    return () => {
      //   authListener?.unsubscribe();
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (user) => {
    try {
      const userData = await getUserRole();
      // console.log(userData);
      const role = userData.data?.[0]?.role || null;
      setRole(role);
      // console.log(Role);
      // console.log("role:", role);
      // // setAuthState({
      //   authenticated: true,
      //   email: user.email || null,
      //   role: role,
      // });

      setAuthState((prevState) => {
        if (
          prevState.authenticated !== true ||
          prevState.email !== user.email ||
          prevState.role !== role
        ) {
          console.log("Updating Auth State:", {
            authenticated: true,
            email: user.email,
            role,
          });
          return { authenticated: true, email: user.email, role };
        }
        return prevState;
      });
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  // catch (error) {
  //   console.error("Error fetching user role:", error);
  // }

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Invalid credentials or error during login!");
        return;
      }

      if (user) {
        fetchUserRole(user);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthState({
      authenticated: false,
      username: null,
      role: null,
    });
  };

  const signUp = async (email, password, userName, role) => {
    // setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    const userId = session.user?.id;
    setAuthData({
      userId: userId,
      userName: userName,
      role: role,
    });
    if (error) Alert.alert(error.message);
    else {
      await saveAuthdata();
    }
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    //setLoading(false);
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    onSignup: signUp,
    authState,
    Role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
