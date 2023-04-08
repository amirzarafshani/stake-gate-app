import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
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
import Carousel from "react-native-reanimated-carousel";
import { StatusBarHeight } from "../helpers/StatusBarHeight";

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
  const width = Dimensions.get("window").width;

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
    // console.log(data.data);
    // console.log(data.data?.total_profit);
    setUserData(data?.data);
    // const wantedGraphicData = [
    //   { x: "Invested Amount", y: data.data?.total_amount },
    //   { x: "Asset Profits", y: data.data?.total_profit },
    //   { x: "Referral Profits", y: data.data?.referral_credits },
    // ];
    // setGraphicData(wantedGraphicData);
  }, [data]);

  // const copyToClipboard = async (val) => {
  //   await Clipboard.setStringAsync(val);
  // };

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
        <View
          className="w-full justify-center"
          style={{ paddingTop: StatusBarHeight }}
        >
          <View className="flex-row items-center justify-between h-20">
            <View className="h-12 w-12 ml-5">
              <SimpleLogo />
            </View>
            <View>
              <Text className="font-['Oswald'] text-xl">DIAMOND STAKE</Text>
            </View>
            <View
              className="h-12 w-12 mr-5"
              // style={{
              //   shadowColor: "#000",
              //   shadowOffset: {
              //     width: 0,
              //     height: 2,
              //   },
              //   shadowOpacity: 0.25,
              //   shadowRadius: 3.84,

              //   elevation: 5,
              // }}
            >
              <CanadaFleg />
            </View>
          </View>
        </View>

        <View
          // className="bg-black"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Carousel
            loop
            width={width}
            height={80}
            autoPlay={true}
            data={userData?.plans}
            scrollAnimationDuration={2000}
            mode="parallax"
            // modeConfig={{
            //   parallaxScrollingScale: 0.9,
            //   parallaxScrollingOffset: 50,
            // }}
            snapEnabled={false}
            autoPlayInterval={1500}
            // onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item }) => (
              <View
                className={`w-full h-20 flex-row rounded-xl overflow-hidden bg-[#F3F4F6]`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 6,
                }}
              >
                <View
                  className={`items-center justify-center w-10 bg-[#1E2026]`}
                >
                  <Text
                    numberOfLines={1}
                    className="text-white font-['Oswald'] whitespace-nowrap text-base capitalize -rotate-90"
                  >
                    {item.name}
                  </Text>
                </View>
                <View className="flex-row justify-between flex-1 p-2">
                  <View className="justify-between flex-1">
                    <View className="flex-row items-baseline">
                      <Text
                        className={`font-['Oswald200'] text-base mr-2 text-gray-900`}
                      >
                        Profit:
                      </Text>
                      <Text
                        className={`font-['Oswald'] font-bold text-lg text-gray-900`}
                      >
                        {item.profit}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <View className="flex-row ">
                        <Text
                          className={`font-['Oswald200'] text-base mr-2 text-gray-900`}
                        >
                          Min Amount:
                        </Text>
                        <Text
                          className={`font-['Oswald'] text-base text-gray-900`}
                        >
                          {item.min_amount}
                        </Text>
                      </View>
                      <View className="flex-row ">
                        <Text
                          className={`font-['Oswald200'] text-base mr-2 text-gray-900`}
                        >
                          Min Referrals:
                        </Text>
                        <Text
                          className={`font-['Oswald'] text-base text-gray-900`}
                        >
                          {item.min_referrals}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-center">
                    {item.plan_type === "fixed" && (
                      <CircularProgress
                        value={item?.days}
                        radius={30}
                        duration={1500}
                        progressValueColor={"#fefefe"}
                        activeStrokeWidth={2}
                        inActiveStrokeWidth={2}
                        activeStrokeColor={
                          selectedPlan === plan.id ? "#70694C" : "#F0B90B"
                        }
                        maxValue={item?.days}
                        title={"DAYS"}
                        titleColor={"white"}
                        titleStyle={{
                          fontSize: 7,
                          fontFamily: "Oswald",
                        }}
                        progressValueStyle={{
                          fontWeight: "100",
                          fontFamily: "Oswald",
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}

            // renderItem={({ index }) => <SBItem index={index} />}
          />
        </View>

        <View className="w-full items-center justify-between">
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
