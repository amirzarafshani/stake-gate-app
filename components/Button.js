import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Button({ label, onPress, disabled, isLoading }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#fff",
    fontFamily: "Oswald",
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#F0B90B",
    borderRadius: 30,
    alignSelf: "flex-start",
  },
});
