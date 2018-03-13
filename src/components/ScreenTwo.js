import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import Header from "./reusable/Header";

@observer
export default class ScreenTwo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title="Screen 2" />
        <Text>Example screen 2 content</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
