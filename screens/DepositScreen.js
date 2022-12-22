import React from "react";
import { Text, View } from "react-native";

function DepositScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View className="w-full text-[#fff] flex-1 p-5 pb-3">
      <Text className="text-white">DepositScreen {itemId}</Text>
    </View>
  );
}

export default DepositScreen;
