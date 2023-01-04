import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChange,
  marginBottom = 15,
  style,
}) {
  const onChange_ = (e) => {
    const value = e.nativeEvent.text;
    onChange(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: marginBottom,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#666"
          keyboardType={keyboardType}
          style={styles.textInput}
          secureTextEntry={true}
          onChange={onChange_}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#666"
          style={{ ...styles.textInput, style }}
          keyboardType={keyboardType}
          onChange={onChange_}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#F0B90B", fontWeight: "300" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: "#fff",
    flex: 1,
    paddingVertical: 0,
    fontFamily: "Oswald",
    fontSize: 18,
  },
});
