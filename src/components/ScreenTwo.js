import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import Header from "./reusable/Header";

@observer
export default class ScreenTwo extends React.Component {
  render() {
    return (
      <View>
        <Header title="Screen 2" />
        <View style={styles.screenContent}>
          <Text>Example screen 2 content</Text>
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
