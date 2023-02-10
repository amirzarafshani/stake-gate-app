import React, { memo, useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
// import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config";
// import { NativeWindStyleSheet } from "nativewind";
import useAuth from "../hooks/useAuth";
// import CircularProgress from "react-native-circular-progress-indicator";
// import StepButton from "../components/StepButton";

const fetchData = (page, token) => {
  // console.log(page);
  return axios.get(`${BASE_URL}/referrals?page=${page}&page_size=10`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function ReferralsScreen({ navigation }) {
  const { userToken } = useAuth();
  const [dataList, setDataList] = useState([]);
  // const [lastPageReached, setLastPageReached] = useState(false);

  const {
    data,
    isSuccess,
    isLoading,
    fetchNextPage,
    isFetching,
    isRefetching,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery(
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

  const loadMore = () => {
    fetchNextPage();
  };

  useEffect(() => {
    if (!data) return;

    // let items = data?.pages[data?.pages?.length - 1]?.data;
    // console.log(data?.pages?.flatMap((x) => x.data));
    // if (items.current_page === items.total_pages) {
    // setLastPageReached(true);
    // }

    setDataList(data?.pages?.flatMap((x) => x.data));
  }, [data]);

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" />;
  };

  return (
    <View className="w-full h-full py-3">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          pagingEnabled={true}
          legacyImplementation={false}
          data={dataList}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 20,
          }}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
          renderItem={({ item }) => <RenderData item={item} />}
          keyExtractor={(item, index) => {
            return item.referral_code;
          }}
          className="w-full"
        />
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
      </View>
      <View className="flex-row items-center justify-between border-t border-gray-700 pt-3 mt-3">
        <View className="whitespace-nowrap items-baseline">
          <Text className="text-gray-500 text-xs font-['Oswald200']">
            Register Date:
          </Text>
          <Text className="text-[#fefefe] text-sm font-['Oswald300']">
            {item.register_date}
          </Text>
        </View>
        <View className="whitespace-nowrap items-baseline">
          <Text className="text-gray-500 text-xs font-['Oswald200']">
            Referred User:
          </Text>
          <Text className="text-[#fefefe] text-sm font-['Oswald300'] self-end">
            {item.referrals?.length ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );
});
