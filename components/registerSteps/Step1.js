import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import InputField from "../InputField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
    };
  }

  static getDerivedStateFromProps = (props) => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep(),
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    const { saveState, getState } = this.props;
    return (
      <React.Fragment>
        <View className="w-full">
          <Text>{`Step ${currentStep} of ${totalSteps}`}</Text>
        </View>
        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={getState("email")}
          onChange={(email) => saveState({ email })}
        />
        <View>
          <TouchableOpacity onPress={this.nextStep}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}

export default Step1;
