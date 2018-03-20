import React from "react";
import { observer } from "mobx-react";
import { View, StyleSheet, Text } from "react-native";
import { List, ListItem } from "react-native-elements";

import nav from "../../helpers/NavigatorHelper";
import { colors } from "../../assets/styles/AppStyles";
import userStore from "../../stores/UserStore";
import Avatar from "./Avatar";

export default (SideMenu = observer(() => {
  const user = userStore.user;
  const menuItems = getMenuItems(user);

  return (
    <View>
      {user ? (
        <View style={styles.avatarRow}>
          <Avatar size={40} src={user.iconUrl} styles={{ marginRight: 10 }} />
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      ) : (
        <View style={{ paddingTop: 30 }} />
      )}
      <List>
        {menuItems.map((item, i) => (
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
}));

//will render even if user is offline
const userAgnosticMenuItems = [
  {
    title: "Home",
    icon: "home",
    onPress: () => nav.navigate("Home")
  },
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

const getMenuItems = user => {
  let menuItems = userAgnosticMenuItems.slice(0);
  if (user) {
    let userMenuItems = [
      {
        title: "My Profile",
        icon: "account-circle",
        onPress: () => nav.navigate("Profile", { userId: user.id })
      }
    ]
      .concat(getCombustMenuItems(user))
      .concat({
        title: "Logout",
        icon: "subdirectory-arrow-left",
        onPress: () => {
          userStore.logout();
          nav.navigate("Login");
        }
      });
    return menuItems.concat(userMenuItems);
  } else {
    menuItems.push({
      title: "Login",
      icon: "account-circle",
      onPress: () => nav.navigate("Login")
    });
    return menuItems;
  }
};

const styles = StyleSheet.create({
  avatarRow: {
    paddingTop: 35,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  userEmail: {
    color: colors.primary,
    fontWeight: "bold"
  }
});

const getCombustMenuItems = user => {
  //combust generate hook, do not rename. altering/removing items is fine
  const COMBUST_MENU_ITEMS = [];
  return COMBUST_MENU_ITEMS;
};
