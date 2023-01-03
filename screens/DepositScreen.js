import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { StepperContainer, StepView } from "@material.ui/react-native-stepper";

import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { BASE_URL } from "../config";
import UsdtIcon from "../src/assets/svg/usdtIcon";

function DepositScreen({ route, navigation }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [plans, setPlans] = useState(undefined);
  const { userToken } = useAuth();

  const handleGetPlans = async () => {
    await axios
      .get(`${BASE_URL}/profile/plans?amount=${amount}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setPlans(data);
        return true;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView className="flex-1">
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step === 1 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">1</Text>
            </View>
            <View className="grow w-[1px] bg-white self-center m-1" />
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                step 1
              </Text>
              <View className={step === 1 ? "h-auto" : "h-0"}>
                <Text className="text-white font-['Oswald']">
                  step 1 content
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step === 2 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">2</Text>
            </View>
            <View className="grow w-[1px] bg-white self-center m-1" />
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                step 2
              </Text>
              <View className={step === 2 ? "h-auto" : "h-0"}>
                <Text className="text-white">step 2 content</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step === 3 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">3</Text>
            </View>
            {/* <View className="grow w-[1px] bg-white self-center m-1" /> */}
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                step 3
              </Text>
              <View className={step === 3 ? "h-auto" : "h-0"}>
                <Text className="text-white">step 3 content</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StepperContainer themeColor="#EABA4C">
        <StepView
          onNext={handleGetPlans}
          title="How much do you want to stake?"
          // subTitle="The intro details"
          hiddenNext={!amount || amount.length == 0}
        >
          <View className="my-5">
            <InputField
              marginBottom={0}
              label={"Amount"}
              icon={
                <View className="w-6 h-7 mr-2">
                  <UsdtIcon />
                </View>
              }
              value={amount}
              onChange={(val) => setAmount(val)}
              keyboardType={"numeric"}
            />
          </View>
        </StepView>
        <StepView
          onNext={() => console.log("step 2")}
          title="Select a plan"
          // subTitle="Name and other details"
        >
          <Text>These posts will</Text>
        </StepView>
        <StepView
          title="Deposit"
          // subTitle="Some lines"
        >
          <Text>
            step 3 You might be aware of Lorem Ipsum, which is standard dummy
            text used in printing and various software which come with some form
            of sample text. Lorem Ipsum is essentially the scrambled version of
            1st century Latin text, De finibus bonorum et malorum, which was
            written by the roman philosopher Marcus Tullius Cicero. Neo Ipsum is
            an …!
          </Text>
        </StepView>
      </StepperContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    color: "#fff",
    padding: 8,
  },
});

export default DepositScreen;
