import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import Header from "./reusable/Header";

@observer
export default class ScreenOne extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header screen="Screen 1" />
        <Text>Example screen 1 content</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
