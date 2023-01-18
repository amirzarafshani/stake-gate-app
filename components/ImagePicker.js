import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";

import * as ImagePicker_ from "expo-image-picker";

function ImagePicker(props) {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    hideModal();
    props.onChange(pickedImagePath);
  }, [pickedImagePath]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker_.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker_.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker_.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker_.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);

      console.log(result.uri);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <View className="h-12 rounded bg-gray-700 flex-1 flex-row items-center justify-between px-2 py-1">
        <TouchableOpacity
          onPress={toggleModal}
          className="border border-[#70694C] h-8 flex-row items-center rounded-full pl-1 pr-2 m-0"
        >
          <View className="w-6 h-6 items-center justify-center">
            <Feather name="upload" size={16} color="#F0B90B" />
          </View>

          <Text className="text-[#F0B90B] text-xs font-['Oswald200']">
            Choos Or Take a Photo
          </Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {pickedImagePath !== "" && (
            <Image
              source={{ uri: pickedImagePath }}
              className="w-9 h-9 rounded"
            />
          )}
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        // swipeDirection={["up", "left", "right", "down"]}
        style={styles.view}
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
        <View style={styles.modal}>
          <View style={styles.buttonContainer}>
            <Button onPress={showImagePicker} title="Select an image" />
            <Button onPress={openCamera} title="Open camera" />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ImagePicker;
