import React from "react";
import firebase from "@firebase/app";

import firebaseConfig from "../.combust/firebase.config.json";
import { initializeStores } from "../.combust/init";
import nav from "../helpers/NavigatorHelper";
import Routes from "./Routes";

console.ignoredYellowBox = ["Setting a timer"]; // swallow react native + firebase warning
firebaseConfig &&
  firebaseConfig.projectId &&
  firebase.initializeApp(firebaseConfig);
initializeStores();

import { View, Text } from "react-native";
export default class App extends React.Component {
  render() {
    return (
      <Routes
        ref={navigatorRef => {
          nav.setContainer(navigatorRef);
        }}
      />
    );
  }
}
