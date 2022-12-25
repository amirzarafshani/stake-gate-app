import React from "react";
import { Text, View } from "react-native";
import useAuth from "../hooks/useAuth";

function DepositScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { logOut } = useAuth();
  logOut();
  return (
    <View className="w-full text-[#fff] flex-1 p-5 pb-3">
      <Text className="text-white">DepositScreen {itemId}</Text>
    </View>
  );
}

export default DepositScreen;
