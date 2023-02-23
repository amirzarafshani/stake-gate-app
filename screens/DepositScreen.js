import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import useAuth from "../hooks/useAuth";
import InputField from "../components/InputField";
import axios from "axios";
import { BASE_URL, DEPOSIT_WALLET_ADDRESS } from "../config";
import UsdtIcon from "../src/assets/svg/usdtIcon";
import StepButton from "../components/StepButton";
import ImagePicker from "../components/ImagePicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import * as Clipboard from "expo-clipboard";
import CircularProgress from "react-native-circular-progress-indicator";
import { useQueryClient } from "react-query";

function DepositScreen({ route, navigation }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [transaction_id, setTransactionId] = useState("");
  const [image, setImage] = useState("");
  const [plans, setPlans] = useState(undefined);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [isGettingPlans, setIsGettingPlans] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userToken } = useAuth();
  const queryClient = useQueryClient();

  const handleGetPlans = async () => {
    setIsGettingPlans(true);
    console.log(`${BASE_URL}/profile/plans?amount=${amount}`);
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

  const handleGoToStep2 = () => {
    setStep(2);
  };

  const handleGoToStep3 = () => {
    if (selectedPlan) {
      setStep(3);
    }
  };

  const handleImagePicked = (image) => {
    setImage(image);
  };

  const handleCopyWalletAddress = async () => {
    await Clipboard.setStringAsync(DEPOSIT_WALLET_ADDRESS);
  };

  const handlePasteTransactionId = async () => {
    const text = await Clipboard.getStringAsync();
    // console.log(text);
    setTransactionId(text);
  };

  const handleSubmitDeposit = () => {
    setIsSubmitting(true);
    // console.log(userToken);
    var formData = new FormData();
    formData.append("amount", amount);
    formData.append("action", "deposit");
    formData.append("transaction_id", transaction_id);
    formData.append("plan_id", selectedPlan);

    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append("image", { uri: localUri, name: filename, type });

    axios
      .post(`${BASE_URL}/assets`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        ToastAndroid.show(
          "Your deposit request has successfully submited!",
          ToastAndroid.SHORT
        );
        queryClient.invalidateQueries("profile");
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
              <Text className="text-white self-center font-['Oswald'] leading-5">
                1
              </Text>
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
              <Text className="text-white self-center font-['Oswald'] leading-5">
                2
              </Text>
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
                        className={`w-full h-20 flex-row border border-gray-700 rounded-xl overflow-hidden ${
                          selectedPlan === plan.id ? "bg-[#F0B90B]" : ""
                        }`}
                      >
                        <View
                          className={`items-center justify-center w-10 bg-[#F0B90B] border-r ${
                            selectedPlan === plan.id
                              ? "border-gray-700"
                              : "border-[#1E2026]"
                          }`}
                        >
                          <Text
                            numberOfLines={1}
                            className="text-white font-['Oswald'] whitespace-nowrap text-base capitalize -rotate-90"
                          >
                            {plan.name}
                          </Text>
                        </View>
                        <View className="flex-row justify-between flex-1 p-2">
                          <View className="justify-between">
                            <View className="flex-row ">
                              <Text
                                className={`font-['Oswald200'] text-base mr-2 ${
                                  selectedPlan === plan.id
                                    ? "text-gray-900 "
                                    : "text-gray-400 "
                                }`}
                              >
                                Profit:
                              </Text>
                              <Text
                                className={`font-['Oswald'] text-base ${
                                  selectedPlan === plan.id
                                    ? "text-gray-900"
                                    : "text-white"
                                }`}
                              >
                                {plan.profit}
                              </Text>
                            </View>
                            <View className="flex-row ">
                              <Text
                                className={`font-['Oswald200'] text-base mr-2 ${
                                  selectedPlan === plan.id
                                    ? "text-gray-900 "
                                    : "text-gray-400 "
                                }`}
                              >
                                Min Referrals:
                              </Text>
                              <Text
                                className={`font-['Oswald'] text-base ${
                                  selectedPlan === plan.id
                                    ? "text-gray-900"
                                    : "text-white"
                                }`}
                              >
                                {plan.min_referrals}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row items-center justify-center">
                            {plan.plan_type === "fixed" && (
                              <CircularProgress
                                value={plan?.days}
                                radius={30}
                                duration={1500}
                                progressValueColor={"#fefefe"}
                                activeStrokeWidth={2}
                                inActiveStrokeWidth={2}
                                activeStrokeColor={
                                  selectedPlan === plan.id
                                    ? "#70694C"
                                    : "#F0B90B"
                                }
                                maxValue={plan?.days}
                                title={"DAYS"}
                                titleColor={"white"}
                                titleStyle={{
                                  fontSize: 7,
                                  fontFamily: "Oswald",
                                }}
                                progressValueStyle={{
                                  fontWeight: "100",
                                  fontFamily: "Oswald",
                                }}
                              />
                            )}
                          </View>
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
              <Text className="text-white self-center font-['Oswald'] leading-5">
                3
              </Text>
            </View>
            {/* <View className="grow w-[1px] bg-white self-center m-1" /> */}
          </View>
          <View className="p-2 shrink grow items-stretch bg-[#1E2026] rounded-xl mb-2 mx-1">
            <View className="px-2">
              <Text className="font-['Oswald'] text-white text-base mb-4">
                Deposit
              </Text>

              <View className={step === 3 ? "h-auto" : "h-0 overflow-hidden"}>
                <View>
                  <Text className="text-gray-400 font-['Oswald300']">
                    Wallet Address To Deposit (TRC20)
                  </Text>
                  <View className="flex-row gap-1">
                    <ScrollView
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      className="h-8 rounded bg-gray-700 flex-1"
                    >
                      <View className="justify-center">
                        <Text
                          numberOfLines={1}
                          className="text-gray-400 font-['Oswald'] px-2 whitespace-nowrap leading-5"
                        >
                          {DEPOSIT_WALLET_ADDRESS}
                        </Text>
                      </View>
                    </ScrollView>
                    <TouchableOpacity
                      onPress={handleCopyWalletAddress}
                      className="h-8 w-8 rounded bg-gray-700 items-center justify-center"
                    >
                      <Feather name="copy" size={18} color="#70694C" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="mt-3">
                  <Text className="text-gray-400 font-['Oswald300']">
                    Deposit Amount
                  </Text>
                  <View className="flex-row gap-1">
                    <View className="h-8 rounded bg-gray-700 flex-1 justify-center">
                      <Text
                        numberOfLines={1}
                        className="text-gray-400 font-['Oswald'] px-2 whitespace-nowrap leading-5"
                      >
                        {amount}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={handleGoToStep1}
                      className="h-8 w-8 rounded bg-gray-700 items-center justify-center"
                    >
                      <Feather name="edit" size={18} color="#70694C" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="mt-3">
                  <Text className="text-gray-400 font-['Oswald300']">
                    Transaction Id
                  </Text>
                  <View className="flex-row gap-1">
                    <ScrollView
                      horizontal
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      className="h-8 rounded bg-gray-700 flex-1"
                    >
                      <View className="justify-center flex-1 w-full">
                        <TextInput
                          numberOfLines={1}
                          // placeholder="Transaction Id"
                          placeholderTextColor="#666"
                          className="text-white font-['Oswald'] px-2 whitespace-nowrap leading-5"
                          value={transaction_id}
                          onChange={setTransactionId}
                        />
                      </View>
                    </ScrollView>
                    <TouchableOpacity
                      onPress={handlePasteTransactionId}
                      className="h-8 w-8 rounded bg-gray-700 items-center justify-center"
                    >
                      <Octicons name="paste" size={18} color="#70694C" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="mt-3">
                  <Text className="text-gray-400 font-['Oswald300']">
                    Transaction Screenshot (JPG, PNG or GIF)
                  </Text>

                  <ImagePicker onChange={handleImagePicked} />
                </View>

                <View className="flex-row mt-10">
                  <View className="mr-3">
                    <StepButton label={"Back"} onPress={handleGoToStep2} />
                  </View>
                  <StepButton
                    label={"Submit"}
                    onPress={handleSubmitDeposit}
                    disabled={isSubmitting || !transaction_id || !image}
                    isLoading={isSubmitting}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <StepButton
        label={"Logout"}
        onPress={logOut}
        // disabled={isGettingPlans || !amount}
      /> */}
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
