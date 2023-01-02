import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ label, onPress, disabled, isLoading }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: "#F0B90B",
        padding: 15,
        borderRadius: 30,
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            color: "#fff",
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
