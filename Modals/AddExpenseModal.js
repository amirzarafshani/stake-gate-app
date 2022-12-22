import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import InputField from "../components/InputField";
import FeatherIcons from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Modal, StyleSheet, Pressable } from "react-native";
import { BASE_URL } from "../config";
import useAuth from "../hooks/useAuth";

function AddExpenseModal({ opens }, ref) {
  const { userToken } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
  }));

  const handleSubmit = () => {
    let dto = { item, price };
    axios
      .post(`${BASE_URL}/api/expenses`, dto, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setModalVisible(false);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text
                style={{
                  // fontFamily: "Roboto-Medium",
                  fontSize: 28,
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: 30,
                }}
              >
                Add new expense
              </Text>

              <InputField
                label={"Item"}
                icon={
                  <FeatherIcons
                    name="shopping-bag"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                keyboardType="item-address"
                value={item}
                onChange={(val) => setItem(val)}
              />

              <InputField
                label={"Price"}
                icon={
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }}
                  />
                }
                inputType="text"
                value={price}
                onChange={(val) => setPrice(val)}
              />

              <Button label={"Submit"} onPress={handleSubmit} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default forwardRef(AddExpenseModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
