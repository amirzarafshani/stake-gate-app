import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function StepButton({ label, onPress, disabled, isLoading }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles(disabled).buttonStyle}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles(disabled).textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = (disabled) =>
  StyleSheet.create({
    buttonStyle: {
      justifyContent: "center",
      textAlign: "center",
      paddingVertical: 3,
      paddingHorizontal: 10,
      width: 100,
      backgroundColor: disabled ? "#493E20" : "#F0B90B",
      borderRadius: 30,
      alignSelf: "flex-start",
      height: 35,
    },
    textStyle: {
      color: disabled ? "#70694C" : "#fff",
      fontFamily: "Oswald",
      fontSize: 16,
      justifyContent: "center",
      textAlign: "center",
    },
  });
