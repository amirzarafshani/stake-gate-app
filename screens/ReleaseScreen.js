import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useQuery, useQueryClient } from "react-query";
import InputField from "../components/InputField";
import { BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/Button";
import Currency from "react-currency-formatter";

const fetchData = (id, token) => {
  return axios.get(`${BASE_URL}/assets/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

function ReleaseScreen({ route, navigation }) {
  const { asset_id } = route.params;
  const { userToken, logOut } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery(
    "asset",
    async () => await fetchData(asset_id, userToken)
  );
  // console.log(data?.data);

  const handleSubmit = () => {
    setIsSubmitting(true);

    console.log(`${BASE_URL}/releases`);
    console.log(userToken);
    axios
      .post(
        `${BASE_URL}/releases`,
        {
          asset_id,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        // const { data } = res;
        ToastAndroid.show(
          "Your release request has successfully submited!",
          ToastAndroid.SHORT
        );
        queryClient.invalidateQueries("assets");
        queryClient.invalidateQueries("profile");
        navigation.navigate("Assets");
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          logOut();
          navigation.navigate("Login");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const colors = ["#f1e4c7", "#E5E8ED", "#F3F4F6"];

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    data?.data && (
      <View className="w-full text-[#fff] flex-1 p-5 pb-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-['Oswald']">
            Plan: {data.data?.plan?.name}
          </Text>
          <Text className="text-white font-['Oswald']">
            Min Referrals: {data.data?.plan?.min_referrals}
          </Text>
        </View>
        <View className="w-full my-3" />
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-['Oswald']">
            Elapsed: {data.data?.elapsed} days
          </Text>
          <Text className="text-white font-['Oswald']">
            Profit: {data.data?.plan?.profit}
          </Text>
        </View>
        <View className="w-full my-3" />
        {/* <View className="flex-row items-center justify-between">
          <Text className="text-white font-['Oswald']">
            Remaining: {data.data?.remaining} days
          </Text>
          <Text className="text-white font-['Oswald']">
            Penalty: {data.data?.plan?.penalty}
          </Text>
        </View>
        <View className="w-full my-3" /> */}

        <View
          className="relative h-56 items-center"
          style={{ position: "relative" }}
        >
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: 200,
              position: "absolute",
              zIndex: 1,
              bottom: 0,
              backgroundColor: colors[2],
              opacity: 0.3,
              transform: [{ scale: 0.9 }],
              borderRadius: 10,
            }}
          />
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: Platform.OS == "ios" ? 180 : 190,
              position: "absolute",
              zIndex: 2,
              bottom: Platform.OS == "ios" ? 15 : 10,
              backgroundColor: colors[1], // Green
              opacity: 0.6,
              transform: [{ scale: 0.95 }],
              borderRadius: 10,
            }}
          />
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: 175,
              position: "absolute",
              zIndex: 3,
              bottom: 20,
              // backgroundColor: colors[0], // Blue
              opacity: 1,
              transform: [{ scale: 1.0 }],
              borderRadius: 10,
            }}
          >
            <View className="bg-[#1E2026] p-4 rounded-2xl">
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-['Oswald']">Amount</Text>
                <Text className="text-[#fff] text-xl font-['Oswald']">
                  <Currency symbol=" " quantity={+data.data?.amount} />
                </Text>
              </View>
              <View className="w-full my-2" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-['Oswald']">Total Profit</Text>
                <Text className="text-[#5EA919] text-xl font-['Oswald']">
                  <Currency
                    symbol=" "
                    quantity={+data.data?.calculated_profit}
                  />
                </Text>
              </View>
              {/* <View className="w-full my-2" /> */}
              {/* <View className="flex-row justify-between items-center">
                <Text className="text-white font-['Oswald']">
                  Total Penalty
                </Text>
                <Text className="text-[#E12028] text-xl font-['Oswald']">
                  <Currency
                    symbol=" "
                    quantity={+data.data?.calculated_penalty}
                  />
                </Text>
              </View> */}

              <View className="w-full border-b-2 border-gray-500 my-4" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-['Oswald']">
                  Total Withdrawable
                </Text>
                <Text className="text-[#F0B90B] text-xl font-['Oswald']">
                  <Currency symbol=" " quantity={+data.data?.total_release} />
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="w-full my-3" />
        <View>
          <InputField
            label={"Your Wallet Address (TRC20)"}
            icon={
              <Ionicons
                name="wallet"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="text"
            value={address}
            onChange={(val) => setAddress(val)}
          />
          <Button
            label={"WITHDRAW"}
            onPress={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting || !address}
          />
        </View>
      </View>
    )
  );
}

export default ReleaseScreen;
