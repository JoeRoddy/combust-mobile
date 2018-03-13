import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import nav from "../helpers/NavigatorHelper";
import Header from "./reusable/Header";

@observer
export default class ScreenOne extends React.Component {
  render() {
    return (
      <View>
        <Header title="Screen 1" />
        <View style={styles.screenContent}>
          <Text>Example screen 1 content</Text>
          <Button
            title="Go to Screen 2"
            onPress={() => nav.navigate("ScreenTwo")}
          />
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
