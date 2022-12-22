import React, { useState, Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import InputField from "../components/InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../hooks/useAuth";
import AnimatedMultistep from "react-native-animated-multistep";
import { Image, View, TouchableOpacity, TextInput, Text } from "react-native";
import Step1 from "../components/registerSteps/Step1";
import Step2 from "../components/registerSteps/Step2";

const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Step2 },
];

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleFinish = (state) => {
    console.log(state);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <View className="w-full px-5 flex-1 justify-center">
        <AnimatedMultistep
          steps={allSteps}
          onFinish={handleFinish}
          // onBack={this.onBack}
          // onNext={this.onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
        />
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;
