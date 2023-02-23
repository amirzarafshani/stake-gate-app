import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
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
// import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory-native";
import { RenderData } from "./SettingsScreen";

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
  const [isModalVisible, setModalVisible] = useState(false);
  const { userToken } = useAuth();
  const [userData, setUserData] = useState({
    total_amount: 0,
    total_profit: 0,
  });
  // const [graphicData, setGraphicData] = useState(defaultGraphicData);
  // const [lastPageReached, setLastPageReached] = useState(false);
  // let [fontsLoaded] = useFonts({
  //   Oswald_400Regular,
  // });

  const hideModal = () => {
    setModalVisible(false);
  };

  const renderSpinner = () => {
    return <ActivityIndicator color="emerald.500" />;
  };

  const {
    data,
    // isSuccess,
    isLoading,
    refetch,
    // fetchNextPage,
    // isFetching,
    isFetchingNextPage,
    // hasNextPage,
  } = useQuery("profile", async () => await fetchData(userToken));

  useEffect(() => {
    if (!data) return;
    console.log(data.data);
    // console.log(data.data?.total_profit);
    setUserData(data.data);
    // const wantedGraphicData = [
    //   { x: "Invested Amount", y: data.data?.total_amount },
    //   { x: "Asset Profits", y: data.data?.total_profit },
    //   { x: "Referral Profits", y: data.data?.referral_credits },
    // ];
    // setGraphicData(wantedGraphicData);
  }, [data]);

  const copyToClipboard = async (val) => {
    await Clipboard.setStringAsync(val);
  };

  // const colors = ["#f1e4c7", "#E5E8ED", "#F3F4F6"];

  return !true ? (
    <ActivityIndicator />
  ) : (
    <View className="w-full bg-[#000] flex-1 pb-3">
      {/* <View className="bg-[#F0B90B] h-1/3"></View> */}
      <View
        className="bg-[#EABA4C] flex-1 items-center justify-between pb-7 relative"
        style={{
          position: "relative",
          maxHeight: Dimensions.get("screen").height / 3.2,
        }}
      >
        <SafeAreaView className="flex-row items-center justify-between w-full p-5">
          <View className="h-12 w-12">
            <SimpleLogo />
          </View>
          <View>
            <Text className="font-['Oswald'] text-xl">DIAMOND STAKE</Text>
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
        {/* <View
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
                  <Text className="p-1 text-base text-blue-800 font-['Oswald'] tracking-wide">
                    Your Referral Code: {userData.referral_code}
                  </Text>
                </TouchableOpacity>

                <Text className="p-1 text-xs text-gray-500 font-['Oswald'] tracking-wide">
                  Your Referred Users Count: {userData.referral_count}
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        <View className="w-full flex-row items-center justify-evenly">
          <Pressable
            onPress={() => {
              // console.log(navigation.navigate("AssetsStack"));
              navigation.navigate("AssetsStack");
            }}
          >
            <Icon name="minuscircleo" size={35} color="#E12028" />
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text
              className="flex-row items-center"
              style={{ fontFamily: "Oswald" }}
            >
              <Text className="text-white text-4xl flex-row justify-end items-end">
                <Currency
                  symbol=""
                  quantity={
                    userData.total_amount +
                    userData.referral_credits +
                    userData.total_profit
                  }
                />
              </Text>
              <View className="h-5 w-5 pl-0.5">
                <UsdtIcon />
              </View>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Deposit");
            }}
          >
            <Icon name="pluscircleo" size={35} color="#5EA919" />
          </Pressable>
        </View>

        <DashboardBg />
      </View>
      <View className="flex-1 relative pt-5 items-center ">
        <View className="w-full h-full">
          <View className="border-b border-gray-600 py-3 mx-5 my-3">
            <Text className="text-white font-['Oswald']">
              Recent Transactions
            </Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            contentContainerStyle={
              userData?.transactions?.length > 0
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
              !userData?.transactions?.length ? (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-white">No Records!</Text>
                </View>
              ) : null
            }
            pagingEnabled={true}
            legacyImplementation={false}
            data={userData?.transactions?.slice(0, 3)}
            // onEndReached={loadMore}
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
              return item.id;
            }}
            className="w-full"
          />
        </View>
        {/* <View
          className="items-center justify-center"
          style={{
            width: (Dimensions.get("screen").width * 50) / 100,
          }}
        >
          <VictoryPie
            labelComponent={<VictoryLabel centerOffset={{ x: 25 }} />}
            animate={{
              duration: 2000,
            }}
            // axisLabelComponent={<VictoryLabel dy={25} />}
            width={(Dimensions.get("screen").width * 80) / 100}
            colorScale={["#EABA4C", "#5EA919", "#f1e4c7"]}
            data={graphicData}
            innerRadius={85}
            labelRadius={150}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: "#fff",
                strokeWidth: 2,
              },
              labels: {
                fill: "#fff",
              },
            }}
          />
        </View> */}
      </View>
      <Modal
        isVisible={isModalVisible}
        // swipeDirection={["up", "left", "right", "down"]}
        // style={styles.modalView}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        useNativeDriverForBackdrop
        useNativeDriver
        hideModalContentWhileAnimating
        // backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        // animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        // swipeDirection={["down"]}
      >
        <View className="bg-[#1E2026] p-5">
          <Text className="text-gray-400 text-sm">
            The amount you have invested{" "}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-['Oswald']">Invested Amount</Text>
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#F0B90B] text-xl font-['Oswald']">
                <Currency symbol=" " quantity={userData.total_amount || 0} />
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
          </View>
          <View className="w-full border-b-2 border-gray-500 my-4" />
          <Text className="text-gray-400 text-sm">
            The profit you have made by referring new users:
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-['Oswald']">
              Invitation Profits
            </Text>
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#F0B90B] text-xl font-['Oswald']">
                <Currency
                  symbol=" "
                  quantity={userData.referral_credits || 0}
                />
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
          </View>
          <View className="w-full border-b-2 border-gray-500 my-4" />
          <Text className="text-gray-400 text-sm">
            The profit you have made out of your investments:
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-['Oswald']">Asset Profits</Text>
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#F0B90B] text-xl font-['Oswald']">
                <Currency symbol=" " quantity={userData.total_profit || 0} />
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
          </View>
          <View className="w-full border-b-2 border-gray-500 my-4" />
          <Text className="text-gray-400 text-sm">
            The profits you have made from your referrals assets
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-white font-['Oswald']">Referral Profits</Text>
            <View className="whitespace-nowrap flex-row gap-1 items-baseline">
              <Text className="text-[#F0B90B] text-xl font-['Oswald']">
                <Currency
                  symbol=" "
                  quantity={userData.refferal_profits || 0}
                />
              </Text>
              <Text className="text-gray-500 text-xs font-['Oswald']">
                USDT
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// const defaultGraphicData = [
//   { x: "Invested Amount", y: 0 },
//   { x: "Asset Profits", y: 0 },
//   { x: "Referral Profits", y: 0 },
// ];
