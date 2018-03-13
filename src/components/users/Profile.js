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

import userStore from "../../stores/UserStore";
import nav from "../../helpers/NavigatorHelper";
import Header from "../reusable/Header";
import Form from "../reusable/Form";
import Avatar from "../reusable/Avatar";
import { primary, secondary } from "../../assets/styles/GlobalStyles";

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

@observer
export default class Profile extends Component {
  render() {
    const routeInfo = nav.getCurrentRoute();
    const userId = routeInfo && routeInfo.params && routeInfo.params.userId;
    const user = userStore.getUserById(userId);

    return (
      <View>
        <Header title="Profile" />
        <View style={styles.screenContent}>
          <Avatar src={user.iconUrl} />
          <Text>email: {user.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContent: {
    padding: 10
  }
});
