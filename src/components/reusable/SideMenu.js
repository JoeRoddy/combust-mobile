import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { observer } from "mobx-react";
import { List, ListItem } from "react-native-elements";

import nav from "../../helpers/NavigatorHelper";
import { primary } from "../../assets/styles/GlobalStyles";
import userStore from "../../stores/UserStore";
import Avatar from "./Avatar";

@observer
export default class SideMenu extends Component {
  logout = () => {
    userStore.logout();
    nav.navigate("Login");
  };

  menuItems = [
    {
      title: "Screen One",
      icon: "star",
      onPress: () => nav.navigate("ScreenOne")
    },
    {
      title: "Screen Two",
      icon: "flag",
      onPress: () => nav.navigate("ScreenTwo")
    }
  ];

  render() {
    const user = userStore.user;
    let itemsToRender = this.menuItems.slice(0);
    if (user) {
      itemsToRender.unshift({
        title: "My Profile",
        icon: "account-circle",
        onPress: () => nav.navigate("Profile", { userId: user.id })
      });
      itemsToRender.push({
        title: "Logout",
        icon: "subdirectory-arrow-left",
        onPress: this.logout
      });
    } else {
      itemsToRender.push({
        title: "Login",
        icon: "account-circle",
        onPress: () => nav.navigate("Login")
      });
    }

    return (
      <View>
        {user && (
          <View style={styles.avatarRow}>
            <Avatar size={40} src={user.iconUrl} styles={{ marginRight: 10 }} />
            <Text style={styles.userEmail}>{user.email} </Text>
          </View>
        )}
        <List>
          {itemsToRender.map((item, i) => (
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
    paddingTop: 35,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  userEmail: {
    color: primary.color,
    fontWeight: "bold"
  }
});
