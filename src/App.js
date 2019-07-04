import React from "react";
import { YellowBox } from "react-native";
import firebase from "@firebase/app";

import firebaseConfig from "./.combust/firebase.config.json";
import { initializeStores } from "./.combust/init";
import nav from "./helpers/NavigatorHelper";
import Routes from "./Routes";

YellowBox.ignoreWarnings([
  "Setting a timer",
  "Require cycle",
  "Overwriting FirebaseError"
]); // swallow react native + firebase warning bugs

firebaseConfig &&
  firebaseConfig.projectId &&
  firebase.initializeApp(firebaseConfig);
initializeStores();

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
