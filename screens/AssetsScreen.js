import React, { memo, useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
// import useAuth from "../hooks/useAuth";
import { BASE_URL } from "../config";
import { NativeWindStyleSheet } from "nativewind";
import useAuth from "../hooks/useAuth";
import CircularProgress from "react-native-circular-progress-indicator";
import StepButton from "../components/StepButton";

const fetchData = (page, token) => {
  // console.log(page);
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
    if (items?.current_page === items?.total_pages) {
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
          contentContainerStyle={
            dataList?.length > 0
              ? {
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingBottom: 20,
                }
              : { flexGrow: 1, justifyContent: "center", alignItems: "center" }
          }
          ListHeaderComponent={
            dataList?.length === 0 ? (
              <View className="flex-1 items-center justify-center">
                <Text className="text-white">No Records!</Text>
              </View>
            ) : null
          }
          pagingEnabled={true}
          legacyImplementation={false}
          data={dataList}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          // contentContainerStyle={{
          //   paddingRight: 20,
          //   paddingLeft: 20,
          //   paddingBottom: 20,
          // }}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
          renderItem={({ item }) => (
            <RenderData item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => {
            return item?.id;
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
    item && (
      <View className="w-full rounded-md mb-1.5 p-3 bg-[#1E2026]">
        <View className="w-full items-center justify-between flex-row">
          {/* <View className="flex-1 items-start">
            <CircularProgress
              value={item?.remaining}
              radius={35}
              duration={1500}
              progressValueColor={"#fefefe"}
              activeStrokeWidth={2}
              inActiveStrokeWidth={2}
              activeStrokeColor={"#F0B90B"}
              maxValue={item?.plan?.days}
              title={"DAYS LEFT"}
              titleColor={"white"}
              titleStyle={{ fontSize: 7, fontFamily: "Oswald" }}
              progressValueStyle={{
                fontWeight: "100",
                fontFamily: "Oswald",
              }}
            />
          </View> */}
          <View className="flex-1 flex-row items-end justify-between ">
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#fefefe] text-xl font-['Oswald']">
                {item.amount}
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#fefefe] text-base font-['Oswald']">
                +{item.calculated_profit ?? 0}
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-between border-t border-gray-700 pt-3 mt-3">
          <View className="whitespace-nowrap items-baseline">
            <Text className="text-gray-500 text-xs font-['Oswald']">
              Staked at:
            </Text>
            <Text className="text-[#fefefe] text-sm font-['Oswald']">
              {item?.staked_at}
            </Text>
          </View>
          <StepButton
            label={"Release"}
            onPress={() => {
              navigation.navigate("Release", {
                asset_id: item?.id,
              });
            }}
          />
        </View>
      </View>
    )
  );
});
