import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

class Step2 extends Component {
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
      <View>
        <View>
          <Text>{`Step ${currentStep} of ${totalSteps}`}</Text>
        </View>
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder={"First Name"}
          placeholderTextColor="#fff"
        />
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder={"Last Name"}
          placeholderTextColor="#fff"
        />
        <View>
          <TouchableOpacity onPress={this.props.back}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextStep}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Step2;
