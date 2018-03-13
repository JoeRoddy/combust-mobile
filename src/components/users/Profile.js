import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import Header from "../reusable/Header";
import userStore from "../../stores/UserStore";
import Form from "../reusable/Form";
import nav from "../../helpers/NavigatorHelper";
import { primary, secondary } from "../../assets/styles/GlobalStyles";

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

@observer
export default class Profile extends Component {
  render() {
    const user = userStore.user;

    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <Text>profile content</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});
