import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { DrawerNavigator } from "react-navigation";

import NavigatorHelper from "./src/helpers/NavigatorHelper";
import Welcome from "./src/components/Welcome";
import SideMenu from "./src/components/reusable/SideMenu";
import Login from "./src/components/users/Login";
import Register from "./src/components/users/Register";
import firebase from "firebase";
import { firebaseConfig } from "./src/.combust/config";
import { initializeStores } from "./src/.combust/init";

const Navigator = DrawerNavigator(
  {
    Login: { screen: Login, path: "/" },
    Register: { screen: Register, path: "/Register" },
    Welcome: { screen: Welcome, path: "/Welcome" }
  },
  {
    initialRouteName: "Welcome",
    contentComponent: SideMenu
  }
);

firebaseConfig && firebase.initializeApp(firebaseConfig);
initializeStores();

export default class App extends React.Component {
  render() {
    return (
      <Navigator
        ref={navigatorRef => {
          NavigatorHelper.setContainer(navigatorRef);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
