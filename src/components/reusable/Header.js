import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Dimensions
} from "react-native";

import { primary } from "../../assets/styles/GlobalStyles";
import { Icon, Button, Header as RneHeader } from "react-native-elements";
import { observer } from "mobx-react";

import nav from "../../helpers/NavigatorHelper";
const statusBarProps = { barStyle: "light-content" };

@observer
export default class Header extends Component {
  componentWillMount() {
    const that = this;
    BackHandler.addEventListener("hardwareBackPress", that.goBack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.goBack) {
      BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      BackHandler.addEventListener("hardwareBackPress", function() {
        nextProps.goBack();
      });
    } else {
      BackHandler.addEventListener("hardwareBackPress", this.goBack);
    }
  }

  goBack = () => {
    const that = this;
    if (that.props.goBack) {
      that.props.goBack();
      return true;
    } else {
      nav.goBack();
      return true;
    }
  };

  render() {
    const cur = nav.getCurrentRoute();
    console.log("route:", cur);

    return (
      <View style={styles.container}>
        {this.props.renderNav ? (
          this.props.renderNav()
        ) : (
          <RneHeader
            statusBarProps={statusBarProps}
            leftComponent={
              cur === "Home" ? (
                <Icon name="menu" color="white" onPress={nav.openDrawer} />
              ) : (
                <Icon
                  name="arrow-back"
                  color="#fff"
                  size={30}
                  onPress={this.goBack}
                />
              )
            }
            centerComponent={{
              text: this.props.screen,
              style: {
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                paddingBottom: 7
              }
            }}
            backgroundColor={primary.color}
            outerContainerStyles={{ height: 80 }}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 80
  }
});
