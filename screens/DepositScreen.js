import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import axios from "axios";
import { BASE_URL } from "../config";
import UsdtIcon from "../src/assets/svg/usdtIcon";
import StepButton from "../components/StepButton";
// import CustomImagePicker from "../components/CustomImagePicker";

function DepositScreen({ route, navigation }) {
  const [step, setStep] = useState(3);
  const [amount, setAmount] = useState("");
  const [plans, setPlans] = useState(undefined);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [isGettingPlans, setIsGettingPlans] = useState(false);
  const { userToken } = useAuth();

  const handleGetPlans = async () => {
    setIsGettingPlans(true);
    await axios
      .get(`${BASE_URL}/profile/plans?amount=${amount}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setPlans(res.data);
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsGettingPlans(false);
      });
  };

  let { logOut } = useAuth();

  const handleGoToStep1 = () => {
    setSelectedPlan(undefined);
    setStep(1);
  };

  const handleGoToStep3 = () => {
    if (selectedPlan) {
      setStep(3);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView className="flex-1">
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step >= 1 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">1</Text>
            </View>
            <View className="grow w-[1px] bg-white self-center m-1" />
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                How much do you want to stake?
              </Text>
              <View className={step === 1 ? "h-auto" : "h-0 overflow-hidden"}>
                <View className=" mt-5 mb-2">
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
                  <View className="mt-5 mr-5">
                    <StepButton
                      label={"Next"}
                      onPress={handleGetPlans}
                      disabled={isGettingPlans || !amount}
                      isLoading={isGettingPlans}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step >= 2 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">2</Text>
            </View>
            <View className="grow w-[1px] bg-white self-center m-1" />
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                Select a plan
              </Text>
              <View className={step === 2 ? "h-auto" : "h-0 overflow-hidden"}>
                <View className="mt-5 mb-2 space-y-1">
                  {plans?.map((plan, index) => (
                    <Pressable
                      key={`plan-item-${index}`}
                      onPress={() => setSelectedPlan(plan.id)}
                    >
                      <View
                        className={`w-full border border-gray-700 rounded-xl p-1 ${
                          selectedPlan === plan.id ? "bg-[#F0B90B]" : ""
                        }`}
                      >
                        <View className="flex-row items-center justify-between">
                          <Text className="text-white font-['Oswald'] text-lg capitalize">
                            {plan.name}
                          </Text>
                          <Text className="text-white font-['Oswald'] text-base capitalize">
                            {plan.plan_type === "fixed"
                              ? `Days: ${plan.days}`
                              : ""}
                          </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                          <Text className="text-white font-['Oswald'] text-lg capitalize">
                            profit: {plan.profit}
                          </Text>
                          <Text className="text-white font-['Oswald'] text-base capitalize">
                            penalty: {plan.penalty}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
                <View className="flex-row mt-5 mb-2">
                  <View className="mr-3">
                    <StepButton label={"Back"} onPress={handleGoToStep1} />
                  </View>
                  <View className="">
                    <StepButton
                      label={"Next"}
                      onPress={handleGoToStep3}
                      disabled={!selectedPlan}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <View className="">
            <View
              className={`w-10 h-10 rounded-full justify-center ${
                step >= 3 ? "bg-[#F0B90B]" : "bg-gray-600"
              }`}
            >
              <Text className="text-white self-center font-['Oswald']">3</Text>
            </View>
            {/* <View className="grow w-[1px] bg-white self-center m-1" /> */}
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base">
                Deposit
              </Text>
              <View className={step === 3 ? "h-auto" : "h-0 overflow-hidden"}>
                <Text className="text-white">step 3 content</Text>
                {/* <CustomImagePicker /> */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StepButton
        label={"Logout"}
        onPress={logOut}
        // disabled={isGettingPlans || !amount}
      />
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
