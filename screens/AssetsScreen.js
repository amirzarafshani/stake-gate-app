import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
// import useAuth from "../hooks/useAuth";
import Currency from "react-currency-formatter";
import {
  BASE_URL,
  COINMARKETCAP_SPARKLINE_URL,
  COINMARKETCAP_URL,
} from "../config";
import SearchBar from "react-native-dynamic-search-bar";
import { default as SvgImage } from "react-native-colored-remote-svg";
import { NativeWindStyleSheet } from "nativewind";
import useAuth from "../hooks/useAuth";

const fetchData = (page, token) => {
  console.log(page);
  return axios.get(`${BASE_URL}/assets?page=${page}&page_size=10`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default function AssetsScreen({ navigation }) {
  const { userToken } = useAuth();
  const [dataList, setDataList] = useState([]);
  const [coinIdsList, setCoinIdsList] = useState(undefined);
  const [lastPageReached, setLastPageReached] = useState(false);

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
    "assets",
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

    let items = data?.pages[data?.pages?.length - 1]?.data?.items;
    // console.log(data?.pages);
    if (items.current_page === items.total_pages) {
      setLastPageReached(true);
    }

    setDataList(data?.pages?.flatMap((x) => x.data?.items));
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
          renderItem={({ item }) => (
            <RenderData item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          className="w-full"
        />
      )}
    </View>
  );
}

export const RenderData = memo(({ item, navigation }) => {
  // const [price, setPrice] = useState(0);

  // const startSocket = (asset) => {
  //   let ws = new WebSocket(
  //     `wss://stream.binance.com:9443/ws/${asset}usdt@trade`
  //   );
  //   ws.onmessage = (e) => {
  //     // console.log(asset, " ", parseFloat(JSON.parse(e.data).p).toFixed(2));
  //     setPrice(parseFloat(JSON.parse(e.data).p).toFixed(2));
  //   };
  // };

  // useEffect(() => {
  //   setPrice(parseFloat(item.current_price));
  //   // startSocket(item.symbol);
  // }, [item]);

  return (
    <Pressable
      className="w-full items-center justify-between flex-row rounded-md mb-1.5 p-3 bg-[#1E2026]"
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate("Deposit", {
          itemId: item.id,
        });
      }}
    >
      <View className="flex-row items-center gap-2 flex-1">
        <View>
          <Text className="text-md text-[#fefefe]">{item.status}</Text>
          <Text className="text-[#758aa6]">{item.plan?.name}</Text>
        </View>
      </View>
      <View className="items-end flex-1">
        <Text className="text-base text-[#fefefe] whitespace-nowrap">
          ${item.amount}
        </Text>
        <Text className="text-[#627498] text-xs whitespace-nowrap">
          {item.staked_at}
        </Text>
      </View>
    </Pressable>
  );
});
