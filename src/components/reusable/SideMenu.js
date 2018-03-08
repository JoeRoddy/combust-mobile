import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { observer } from "mobx-react";
import { List, ListItem } from "react-native-elements";

import userStore from "../../stores/UserStore";
import Avatar from "./Avatar";

@observer
export default class SideMenu extends Component {
  state = {};

  logout = () => {
    userStore.logout();
    this.props.navigation.navigate("Login");
  };

  list = [
    {
      title: "Logout",
      icon: "subdirectory-arrow-left",
      onPress: this.logout
    }
  ];

  render() {
    const user = userStore.user;
    return (
      <View>
        {user && (
          <View style={styles.avatarRow}>
            <Avatar size={40} src={user.iconUrl} styles={{ marginRight: 10 }} />
            <Text style={styles.userEmail}>{user.email} </Text>
          </View>
        )}
        <List>
          {this.list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, style: { fontSize: 20 } }}
              onPress={item.onPress}
              underlayColor="#edeff2"
            />
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center"
  },
  button: {
    width: 300,
    marginTop: 30
  },
  h1: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    height: 40,
    width: 300
  },
  avatarRow: {
    paddingTop: 18,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  userEmail: {
    color: "#7B4ED1",
    fontWeight: "bold"
  }
});
