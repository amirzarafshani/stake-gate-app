import React, { memo, useEffect, useState } from "react";
import { RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
// import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config";
import { NativeWindStyleSheet } from "nativewind";
import useAuth from "../hooks/useAuth";
import CircularProgress from "react-native-circular-progress-indicator";
import StepButton from "../components/StepButton";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const fetchData = (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function SettingsScreen({ navigation }) {
  const { userToken } = useAuth();
  const [userData, setUserData] = useState({
    total_amount: 0,
    total_profit: 0,
  });

  const {
    data,
    refetch,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useQuery("profile", async () => await fetchData(userToken));

  useEffect(() => {
    if (!data) return;
    console.log(data.data?.referral_code);
    setUserData(data.data);
    //   let meta = data?.pages[data?.pages?.length - 1]?.data?.meta;

    //   if (meta.current_page === meta.last_page) {
    //     setLastPageReached(true);
    //   }

    //   setDataList(data?.pages?.flatMap((x) => x.data.data));
  }, [data]);

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" />;
  };

  const copyToClipboard = async (val) => {
    await Clipboard.setStringAsync(val);
  };

  return (
    <View className="w-full h-full py-3 ">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="mb-40">
          <View className="flex-row items-center bg-[#1E2026] mx-5 rounded-xl">
            <View className="w-20 items-center justify-center">
              <Icon name="user" size={45} color="#c99" />
            </View>
            <View className="">
              <Text className="p-1 text-sm text-gray-400 font-['Oswald'] tracking-wide">
                Email: {userData.email}
              </Text>
              <View className=" flex-row items-center">
                <Text className="p-1 text-sm text-gray-400 font-['Oswald'] tracking-wide">
                  Your Referral Code: {userData.referral_code}
                </Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(userData.referral_code)}
                  className="h-5 w-5 rounded bg-gray-700 items-center justify-center ml-1"
                >
                  <Feather name="copy" size={15} color="#70694C" />
                </TouchableOpacity>
              </View>
              <Text className="p-1 text-sm text-gray-400 font-['Oswald'] tracking-wide">
                Your Referred Users Count: {userData.referral_count}
              </Text>
            </View>
          </View>
          <View className="border-b border-gray-600 py-3 mx-5 my-3">
            <Text className="text-white font-['Oswald']">
              Your Transactions
            </Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            pagingEnabled={true}
            legacyImplementation={false}
            data={userData?.transactions}
            // onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            contentContainerStyle={{
              paddingRight: 20,
              paddingLeft: 20,
              paddingBottom: 20,
            }}
            ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            renderItem={({ item }) => (
              <RenderData item={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            className="w-full"
          />
        </View>
      )}
    </View>
  );
}

export const RenderData = memo(({ item }) => {
  return (
    <View className="w-full rounded-md mb-1.5 p-3 bg-[#1E2026]">
      <View className="flex-row items-center justify-between border-b border-gray-700 pb-3 mb-3">
        <View className="whitespace-nowrap items-baseline">
          <Text className="text-[#fefefe] text-sm font-['Oswald300']">
            {item.action}
          </Text>
        </View>
        <View className="whitespace-nowrap items-baseline">
          <Text className="text-[#fefefe] text-xs font-['Oswald300'] self-end">
            {item.created_at}
          </Text>
        </View>
      </View>
      <View className="w-full items-center justify-between flex-row">
        <View className="flex-1 justify-start ">
          <Text className="text-[#fefefe] text-lg font-['Oswald300']">
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
});
