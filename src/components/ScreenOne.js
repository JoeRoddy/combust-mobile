import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import { viewStyles, textStyles } from "../assets/styles/AppStyles";
import nav from "../helpers/NavigatorHelper";
import { Button, Header, Screen } from "./reusable";

class ScreenOne extends React.Component {
  render() {
    return (
      <Screen title="Screen One">
        <Text style={styles.margin}>
          Example screen 1 content. Open it up and start exploring!
        </Text>
        <Text style={[textStyles.code, styles.file]}>
          src/components/ScreenOne.js
        </Text>
        <Button
          secondary
          title="Go to Screen 2"
          onPress={() => nav.navigate("ScreenTwo")}
        />
      </Screen>
    );
  }
}

export default observer(ScreenOne);

const styles = StyleSheet.create({
  margin: {
    margin: 10
  },
  file: {
    marginBottom: 10,
    textAlign: "center"
  }
});
