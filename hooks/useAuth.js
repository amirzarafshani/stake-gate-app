import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import { showMessage, hideMessage } from "react-native-flash-message";
import { toast } from "@backpackapp-io/react-native-toast";

const authContextDefaultValues = {
  userToken: null,
  login: (email, password) => {},
  register: (email, password) => {},
  logOut: () => {},
  isLoading: false,
  isRegistering: false,
};

const AuthContext = createContext(authContextDefaultValues);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userToken, setUserToken] = useState(null);
  // const { toast } = useToast();

  useEffect(() => {
    isLoggedIn();
  }, []);

  function login(email, password) {
    setIsLoading(true);
    console.log({
      email,
      password,
    });

    axios
      .post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        const { data } = res;
        // console.log(data.token);
        if (data) {
          setUserToken(data.token);
          AsyncStorage.setItem("userToken", data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Please check your information and try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function register(email, password, referral_code) {
    setIsRegistering(true);
    console.log({
      email,
      password,
      referral_code,
    });

    axios
      .post(
        `${BASE_URL}/auth/register`,
        {
          email,
          password,
          referral_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { data } = res;
        // console.log(data.token);
        if (data) {
          setUserToken(data.token);
          AsyncStorage.setItem("userToken", data.token);
        }
      })
      .catch((err) => {
        // console.log(err?.response?.data?.errors);
        if (err?.response?.data?.errors) {
          err?.response?.data?.errors?.forEach((element, i) => {
            toast.error(element);
          });
        }
      })
      .finally(() => {
        setIsRegistering(false);
      });
  }

  async function logOut() {
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken_ = await AsyncStorage.getItem("userToken");
      // console.log(userToken_);
      setUserToken(userToken_);
      setIsLoading(false);
    } catch (error) {}
  };
  return (
    <AuthContext.Provider
      value={{ login, logOut, isLoading, register, isRegistering, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
