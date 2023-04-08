import React, { memo, useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
import Button from "../components/Button";
// import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config";
// import { NativeWindStyleSheet } from "nativewind";
import useAuth from "../hooks/useAuth";
import StepButton from "../components/StepButton";
// import CircularProgress from "react-native-circular-progress-indicator";
// import StepButton from "../components/StepButton";

const fetchData = (page, token) => {
  console.log(token);
  return axios.get(`${BASE_URL}/referrals`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function ReferralsScreen({ navigation }) {
  const { userToken } = useAuth();
  const [dataList, setDataList] = useState({});
  // const [lastPageReached, setLastPageReached] = useState(false);

  const {
    data,
    isSuccess,
    isLoading,
    // fetchNextPage,
    isFetching,
    isRefetching,
    refetch,
    isFetchingNextPage,
  } = useQuery(
    "referrals",
    async ({ pageParam = 1 }) => await fetchData(pageParam, userToken),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.has_next_page) {
          const nextPage = allPages.length + 1;
          return nextPage;
        }
        return undefined;
      },
      // refetchInterval: 5 * 1000,
      // onError: (error) => console.log("error"),
    }
  );

  // const loadMore = () => {
  //   fetchNextPage();
  // };

  useEffect(() => {
    if (!data) return;

    // let items = data?.pages[data?.pages?.length - 1]?.data;
    console.log(data?.data);
    // if (items.current_page === items.total_pages) {
    // setLastPageReached(true);
    // }

    setDataList(data?.data);
  }, [data]);

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" />;
  };

  return (
    <View className="w-full h-full py-3">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="mb-40 h-full">
          <View className="bg-[#1E2026] p-2 mx-5 rounded-xl">
            <View className="whitespace-nowrap gap-1 mb-3 flex-row items-baseline">
              <Text className="text-gray-400 text-sm font-['Oswald200']">
                Assets count from all of your referrals:
              </Text>
              <Text className="text-[#fefefe] text-sm font-['Oswald300']">
                {dataList.referrals_assets_count ?? 0}
              </Text>
            </View>
            <View className="whitespace-nowrap gap-1 items-baseline">
              <Text className="text-gray-400 text-sm mb-1 font-['Oswald200']">
                Profit you have made from your referral's assets:
              </Text>
              <View className="flex-row w-full items-center justify-between">
                <View className="whitespace-nowrap flex-row gap-1 items-baseline">
                  <Text className="text-[#F0B90B] text-2xl font-['Oswald300']">
                    {dataList.referral_profits
                      ? `+${dataList.referral_profits.toFixed(2)}`
                      : 0}
                  </Text>
                  <Text className="text-gray-500 text-xs font-['Oswald']">
                    USDT
                  </Text>
                </View>
                <View className="">
                  <StepButton
                    disabled={true}
                    label={"Release"}
                    // onPress={() => {
                    //   navigation.navigate("Release", {
                    //     asset_id: item?.id,
                    //   });
                    // }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="border-b border-gray-600 py-3 mx-5 my-3">
            <Text className="text-white font-['Oswald']">Your Referrals</Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            contentContainerStyle={
              dataList?.referrals?.length > 0
                ? {
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingBottom: 20,
                  }
                : {
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }
            }
            ListHeaderComponent={
              dataList?.referrals?.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-white">No Records!</Text>
                </View>
              ) : null
            }
            pagingEnabled={true}
            legacyImplementation={false}
            data={dataList?.referrals}
            // onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            // contentContainerStyle={{
            //   paddingRight: 20,
            //   paddingLeft: 20,
            //   paddingBottom: 20,
            // }}
            ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            renderItem={({ item }) => <RenderData item={item} />}
            keyExtractor={(item, index) => {
              return item.referral_code;
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
      <View className="w-full items-center justify-between flex-row">
        <View className="flex-1 justify-start ">
          <Text className="text-[#fefefe] text-lg font-['Oswald300']">
            {item.email}
          </Text>
        </View>
        <View className="whitespace-nowrap items-end">
          <Text className="text-gray-500 text-xs font-['Oswald200']">
            Register Date
          </Text>
          <Text className="text-[#fefefe] text-sm font-['Oswald300']">
            {item.register_date}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between border-t border-gray-700 pt-3 mt-3">
        <View className="whitespace-nowrap items-baseline">
          <Text className="text-gray-500 text-xs font-['Oswald200']">
            Assets Count
          </Text>
          <Text className="text-[#fefefe] text-sm font-['Oswald300']">
            {item.asset_count ?? 0}
          </Text>
        </View>
        <View className="whitespace-nowrap items-end">
          <Text className="text-gray-500 text-xs font-['Oswald200']">
            Your Referral Profits
          </Text>
          <View className="whitespace-nowrap flex-row gap-1 items-baseline">
            <Text className="text-[#5EA919] text-xl font-['Oswald']">
              {item.referrer_assets_profit
                ? `+${item.referrer_assets_profit.toFixed(2)}`
                : 0}
            </Text>
            <Text className="text-gray-500 text-xs font-['Oswald']">USDT</Text>
          </View>
        </View>
      </View>
    </View>
  );
});
