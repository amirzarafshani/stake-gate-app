import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
// import useAuth from "../hooks/useAuth";
import Currency from "react-currency-formatter";
import {
  BASE_URL,
  COINMARKETCAP_SPARKLINE_URL,
  COINMARKETCAP_URL,
} from "../config";
import SearchBar from "react-native-dynamic-search-bar";
import coins from "../constants/coins";
import { default as SvgImage } from "react-native-colored-remote-svg";
import { NativeWindStyleSheet } from "nativewind";

const fetchData = (page, token) => {
  return axios.get(`${BASE_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchChartData = () => {
  return axios.get(`${COINMARKETCAP_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function ExpensesScreen({ navigation }) {
  // const { userToken } = useAuth();
  const [dataList, setDataList] = useState([]);
  const [coinIdsList, setCoinIdsList] = useState(undefined);
  const [keyword, setKeyword] = useState("");

  const {
    data,
    isSuccess,
    isLoading,
    fetchNextPage,
    isFetching,
    isRefetching,
    refetch,
    isFetchingNextPage,
  } = useQuery(
    "markets",
    async ({ pageParam = 1 }) => await fetchData(pageParam, "userToken"),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
      refetchInterval: 5 * 1000,
    }
  );

  const { data: coionIds, error } = useQuery(
    "coinIds",
    async () => await fetchChartData()
  );

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" />;
  };

  useEffect(() => {
    if (!data) return;
    // startSocket();
    // console.log(data.data[0].current_price);
    // let meta = data?.pages[data?.pages?.length - 1]?.data?.meta;

    // if (meta.current_page === meta.last_page) {
    //   setLastPageReached(true);
    // }

    setDataList(data.data);
  }, [data]);

  useEffect(() => {
    console.log(error);
    if (!coionIds) return;
    // console.log(
    //   coionIds?.data?.data?.cryptoCurrencyList.map((el) => ({
    //     symbol: el.symbol,
    //     id: el.id,
    //   }))
    // );

    setCoinIdsList(
      coionIds?.data?.data?.cryptoCurrencyList.map((el) => ({
        symbol: el.symbol,
        id: el.id,
      }))
    );
  }, [coionIds]);

  return (
    <SafeAreaView className="w-full bg-[#0a214b] flex-1">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <SearchBar
            fontColor="#ffffff"
            iconColor="#ffffff"
            shadowColor="#ffffff"
            cancelIconColor="#ffffff"
            backgroundColor="#112d5c"
            placeholder="Search here"
            onChangeText={(text) => setKeyword(text)}
            onSearchPress={() => console.log("Search Icon is pressed")}
            onClearPress={() => setKeyword("")}
            onPress={() => console.log("onPress")}
            style={{ backgroundColor: "#112d5c", borderRadius: 50 }}
            placeholderTextColor="#9cb1d0"
          />
          <FlatList
            refreshControl={
              <RefreshControl
                //  refreshing={isRefetching}
                onRefresh={refetch}
              />
            }
            pagingEnabled={true}
            legacyImplementation={false}
            data={dataList.filter((el) =>
              keyword
                ? el.name.toLowerCase().includes(keyword.toLowerCase()) ||
                  el.symbol.toLowerCase().includes(keyword.toLowerCase())
                : el
            )}
            // onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            contentContainerStyle={{
              padding: 20,
            }}
            ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            renderItem={({ item }) => (
              <RenderData
                item={item}
                chartId={
                  coinIdsList?.find(
                    (el) =>
                      el.symbol.toUpperCase() === item.symbol.toUpperCase()
                  )?.id
                }
              />
            )}
            keyExtractor={(item) => {
              `${item.name}-${item.symbol}-${Math.random()}`;
            }}
            className="w-full"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export const RenderData = memo(({ item, chartId }) => {
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
    <View className="w-full items-center justify-between flex-row rounded-md mb-1.5 p-3 bg-[#133365]">
      <View className="flex-row items-center gap-2 flex-1">
        <Image source={{ uri: item.image }} className="w-10 h-10" />
        <View>
          <Text className="text-md text-[#fefefe]">{item.name}</Text>
          <Text className="text-[#758aa6]">{item.symbol}</Text>
        </View>
      </View>
      {chartId && (
        <View style={{ color: "#ffffff" }}>
          <SvgImage
            style={{
              filter: "hue-rotate(85deg) saturate(80%) brightness(0.85)",
              fill: "#ffffff",
            }}
            className="w-32 h-16 sparkline-chart"
            source={{
              uri: `${COINMARKETCAP_SPARKLINE_URL}${chartId}.svg`,
            }}
          />
        </View>
      )}
      <View className="items-end flex-1">
        <Text className="text-base text-[#fefefe] whitespace-nowrap">
          ${item.current_price}
        </Text>
        <Text className="text-[#627498] text-xs whitespace-nowrap">
          {item.price_change_percentage_24h}%
        </Text>
      </View>
    </View>
  );
});

NativeWindStyleSheet.create({
  "sparkline-chart": {
    filter: "hue-rotate(85deg) saturate(80%) brightness(0.85)",
  },
});
