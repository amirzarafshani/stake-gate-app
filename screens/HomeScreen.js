import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import Icon from "react-native-vector-icons/AntDesign";
import Currency from "react-currency-formatter";
import { BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";
import DashboardBg from "../src/assets/svg/dashboardBg";
// import { useFonts, Oswald_400Regular } from "@expo-google-fonts/oswald";
import * as Clipboard from "expo-clipboard";
import CanadaFleg from "../src/assets/svg/canadaFleg";
import UsdtIcon from "../src/assets/svg/usdtIcon";
import SimpleLogo from "../src/assets/svg/SimpleLogo";

const fetchData = (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function ExpensesScreen({ navigation }) {
  const { userToken } = useAuth();
  const [userData, setUserData] = useState({
    total_amount: 0,
    total_profit: 0,
  });
  const [lastPageReached, setLastPageReached] = useState(false);
  // let [fontsLoaded] = useFonts({
  //   Oswald_400Regular,
  // });

  const {
    data,
    isSuccess,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useQuery("profile", async () => await fetchData(userToken));

  useEffect(() => {
    if (!data) return;
    // console.log(data.data);
    setUserData(data.data);
    //   let meta = data?.pages[data?.pages?.length - 1]?.data?.meta;

    //   if (meta.current_page === meta.last_page) {
    //     setLastPageReached(true);
    //   }

    //   setDataList(data?.pages?.flatMap((x) => x.data.data));
  }, [data]);

  const copyToClipboard = async (val) => {
    await Clipboard.setStringAsync(val);
  };

  const colors = ["#f1e4c7", "#E5E8ED", "#F3F4F6"];

  return !true ? (
    <ActivityIndicator />
  ) : (
    <View className="w-full bg-[#000] flex-1 pb-3">
      {/* <View className="bg-[#F0B90B] h-1/3"></View> */}
      <View
        className="bg-[#EABA4C] flex-1 items-center justify-between pb-7 relative"
        style={{
          position: "relative",
          maxHeight: Dimensions.get("screen").height / 2,
        }}
      >
        <SafeAreaView className="flex-row items-center justify-between w-full p-5">
          <View className="h-12 w-12">
            <SimpleLogo />
          </View>
          <View
            className="h-12 w-12 rounded-full overflow-hidden bg-[#ec2224]"
            style={{
              hadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <CanadaFleg />
          </View>
        </SafeAreaView>
        <View
          className="relative h-32 items-center"
          style={{ position: "relative" }}
        >
          <View
            style={{
              width: (Dimensions.get("screen").width * 90) / 100,
              height: 100,
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
              height: 100,
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
              height: 100,
              position: "absolute",
              zIndex: 3,
              bottom: 20,
              backgroundColor: colors[0], // Blue
              opacity: 1,
              transform: [{ scale: 1.0 }],
              borderRadius: 10,
            }}
          >
            <View className="flex-row items-center h-full">
              <View className="w-20 items-center justify-center">
                <Icon name="user" size={45} color="#c99" />
              </View>
              <View className="">
                <TouchableOpacity
                  onPress={() => copyToClipboard(userData.referral_code)}
                >
                  <Text className="p-1 text-base text-blue-800">
                    Your Referral Code: {userData.referral_code}
                  </Text>
                </TouchableOpacity>

                <Text className="p-1 text-xs text-gray-500">
                  Your Referred Users Count: {userData.referral_count}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="w-full flex-row items-center justify-evenly">
          <Pressable>
            <Icon name="minuscircleo" size={35} color="#E12028" />
          </Pressable>
          <Text
            className="flex-row items-center"
            style={{ fontFamily: "Oswald" }}
          >
            <Text className="text-white text-4xl flex-row justify-end items-end">
              <Currency symbol="" quantity={userData.total_amount} />
            </Text>
            <View className="h-5 w-5 pl-0.5">
              <UsdtIcon />
            </View>
          </Text>
          <Pressable
            className="bg-[#F0B90B] rounded-full text-white px-3 py-1"
            onPress={() => {
              navigation.navigate("Deposit");
            }}
          >
            <Icon name="pluscircleo" size={35} color="#5EA919" />
          </Pressable>
        </View>

        <DashboardBg />
      </View>
      <View className="flex-1 relative pt-10"></View>
    </View>
  );
}
