import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

import Currency from "react-currency-formatter";
import { BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";
import DashboardBg from "../src/assets/svg/dashboardBg";

const fetchData = (page, token) => {
  return axios.get(`${BASE_URL}/api/expenses?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function ExpensesScreen({ navigation }) {
  const { userToken } = useAuth();
  const [dataList, setDataList] = useState();
  const [lastPageReached, setLastPageReached] = useState(false);

  // const {
  //   data,
  //   isSuccess,
  //   isLoading,
  //   fetchNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery(
  //   "expenses",
  //   async ({ pageParam = 1 }) => await fetchData(pageParam, userToken),
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       const nextPage = allPages.length + 1;
  //       return nextPage;
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (!data) return;

  //   let meta = data?.pages[data?.pages?.length - 1]?.data?.meta;

  //   if (meta.current_page === meta.last_page) {
  //     setLastPageReached(true);
  //   }

  //   setDataList(data?.pages?.flatMap((x) => x.data.data));
  // }, [data]);

  return !true ? (
    <ActivityIndicator />
  ) : (
    <View className="w-full bg-[#000] flex-1 pb-3">
      {/* <View className="bg-[#F0B90B] h-1/3"></View> */}
      <View
        className="bg-[#EABA4C] flex-1 justify-endd relative"
        style={{
          position: "relative",
          maxHeight: Dimensions.get("screen").height / 3,
        }}
      >
        <Text className="text-white">testtesttesttest</Text>
        <DashboardBg />
      </View>
      <View className="flex-1">
        <Text>test</Text>
      </View>
    </View>
  );
}
