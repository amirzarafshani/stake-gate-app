import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {
  useFonts,
  Oswald_200ExtraLight as Oswald200,
  Oswald_300Light as Oswald300,
  Oswald_400Regular as Oswald,
} from "@expo-google-fonts/oswald";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../config";
import SimpleLogo from "../src/assets/svg/SimpleLogo";

const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(0);
  let [fontsLoaded] = useFonts({
    Oswald,
    Oswald200,
    Oswald300,
  });
  let { userToken } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (userToken) {
        verifyToken();
      } else {
        setAuthLoaded(1);
      }
    }, 3000);
  }, [userToken]);

  const verifyToken = () => {
    axios
      .get(`${BASE_URL}/profile/verify_token`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setAuthLoaded(2);
      })
      .catch((err) => {
        console.log(err);
        setAuthLoaded(1);
      })
      .finally(() => {});
  };

  useEffect(() => {
    // console.log({ authLoaded });
    if (fontsLoaded) {
      if (authLoaded === 2) {
        props.navigation.replace("Home");
      } else if (authLoaded === 1) {
        props.navigation.replace("Login");
      }
    }
  }, [authLoaded, fontsLoaded, props.navigation]);

  return (
    <View style={styles.root}>
      <View className="h-32 w-32">
        <SimpleLogo />
      </View>
      <View className="flex-row items-center gap-2 mt-4">
        <ActivityIndicator color="#000" />
        <Text className="text-base text-black">Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EABA4C",
  },
});

export default SplashScreen;
