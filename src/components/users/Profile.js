import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import userStore from "../../stores/UserStore";
import nav from "../../helpers/NavigatorHelper";
import Header from "../reusable/Header";
import Avatar from "../reusable/Avatar";

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
