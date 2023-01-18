import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  useFonts,
  Oswald_200ExtraLight as Oswald200,
  Oswald_300Light as Oswald300,
  Oswald_400Regular as Oswald,
} from "@expo-google-fonts/oswald";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../config";

const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(0);
  let [fontsLoaded] = useFonts({
    Oswald,
    Oswald200,
    Oswald300,
  });
  let { userToken, logOut } = useAuth();

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
      <Text className="text-white">Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
