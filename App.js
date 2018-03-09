import React from "react";
import firebase from "firebase";

import { firebaseConfig } from "./src/.combust/config";
import { initializeStores } from "./src/.combust/init";
import nav from "./src/helpers/NavigatorHelper";
import Routes from "./src/components/Routes";

console.ignoredYellowBox = ["Setting a timer"]; // swallow react native + firebase warning
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
