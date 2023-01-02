import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useQuery } from "react-query";
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
  const { userToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");

  const { data, isSuccess, isLoading } = useQuery(
    "asset",
    async () => await fetchData(asset_id, userToken)
  );
  // console.log(data?.data);

  const handleSubmit = () => {
    setIsSubmitting(true);

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
          },
        }
      )
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const colors = ["#f1e4c7", "#E5E8ED", "#F3F4F6"];

  return (
    data && (
      <View className="w-full text-[#fff] flex-1 p-5 pb-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-white">Plan: {data.data?.plan?.name}</Text>
          <Text className="text-white">Days: {data.data?.plan?.days}</Text>
        </View>
        <View className="w-full my-3" />
        <View className="flex-row items-center justify-between">
          <Text className="text-white">Elapsed: {data.data?.elapsed} days</Text>
          <Text className="text-white">Profit: {data.data?.plan?.profit}</Text>
        </View>
        <View className="w-full my-3" />
        <View className="flex-row items-center justify-between">
          <Text className="text-white">
            Remaining: {data.data?.remaining} days
          </Text>
          <Text className="text-white">
            Penalty: {data.data?.plan?.penalty}
          </Text>
        </View>
        <View className="w-full my-3" />

        <View
          className="relative h-64 items-center"
          style={{ position: "relative" }}
        >
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: 220,
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
              height: 220,
              position: "absolute",
              zIndex: 2,
              bottom: 10,
              backgroundColor: colors[1], // Green
              opacity: 0.6,
              transform: [{ scale: 0.95 }],
              borderRadius: 10,
            }}
          />
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: 220,
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
                <Text className="text-white">Amount</Text>
                <Text className="text-[#fff] text-xl">
                  <Currency symbol=" " quantity={data.data?.amount} />
                </Text>
              </View>
              <View className="w-full my-2" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white">Total Profit</Text>
                <Text className="text-[#5EA919] text-xl">
                  <Currency
                    symbol=" "
                    quantity={data.data?.calculated_profit}
                  />
                </Text>
              </View>
              <View className="w-full my-2" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white">Total Penalty</Text>
                <Text className="text-[#E12028] text-xl">
                  <Currency
                    symbol=" "
                    quantity={data.data?.calculated_penalty}
                  />
                </Text>
              </View>

              <View className="w-full border-b-2 border-gray-500 my-4" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white">Total Withdrawable</Text>
                <Text className="text-[#F0B90B] text-xl font-bold">
                  <Currency symbol=" " quantity={data.data?.total_release} />
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
            disabled={isSubmitting || !address}
            className="bg-[#F0B90B] w-full"
          />
        </View>
      </View>
    )
  );
}

export default ReleaseScreen;