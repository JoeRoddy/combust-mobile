import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import { viewStyles, textStyles } from "../assets/styles/AppStyles";
import { Header, Screen } from "./reusable";

class ScreenTwo extends React.Component {
  render() {
    return (
      <Screen title="Screen Two">
        <Text style={styles.margin}>Example screen 2 content, edit this!</Text>
        <Text style={[textStyles.code, styles.margin]}>
          src/components/ScreenTwo.js
        </Text>
      </Screen>
    );
  }
}

export default observer(ScreenTwo);

const styles = StyleSheet.create({
  margin: {
    margin: 10
  }
});
