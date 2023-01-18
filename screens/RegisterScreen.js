import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import InputField from "../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import DashboardBg from "../src/assets/svg/dashboardBg";
import Logo from "../src/assets/svg/Logo";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isRegistering } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className="flex-1 justify-evenly items-center w-full bg-black relative"
      style={{ minHeight: Dimensions.get("screen").height - 200 }}
    >
      <View className="absolute top-0 left-0 h-[55%] w-full bg-[#EABA4C]">
        <DashboardBg />
      </View>
      <View className="justify-center">
        <Logo />
      </View>
      <View className="px-5 bg-[#1E2026] w-[80%] rounded-3xl p-5 justify-between">
        <Text className="text-white text-center text-lg">Register Account</Text>

        <View className="mt-5">
          <InputField
            label={"Email Address"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            value={email}
            onChange={(val) => setEmail(val)}
          />

          <InputField
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            // fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {}}
            value={password}
            onChange={(val) => setPassword(val)}
          />
        </View>

        <Button
          disabled={isRegistering}
          label={"Register"}
          onPress={() => {
            register(email, password);
          }}
          className="bg-[#F0B90B] w-full"
          isLoading={isRegistering}
        />
      </View>

      <View className="justify-start pt-5 gap-2">
        <Text className="text-white text-base">Already Registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-[#F0B90B] text-center text-base">LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
