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
      <View style={styles.container}>
        <Header title="Screen 1" />
        <Text>Example screen 1 content</Text>
        <Button
          title="Go to Screen 2"
          onPress={() => nav.navigate("ScreenTwo")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
