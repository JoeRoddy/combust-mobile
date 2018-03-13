import React, { Component } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { Icon, Button, Header as RneHeader } from "react-native-elements";
import { observer } from "mobx-react";

import { primary } from "../../assets/styles/GlobalStyles";
import nav from "../../helpers/NavigatorHelper";

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
    const routeName = cur && cur.routeName;

    // console.log("route:", cur);
    // console.log("name:", routeName);

    return (
      <View style={styles.container}>
        {this.props.renderNav ? (
          this.props.renderNav()
        ) : (
          <RneHeader
            statusBarProps={{ barStyle: "light-content" }}
            leftComponent={
              routeName === "Home" || !routeName ? (
                <Icon name="menu" color="white" onPress={nav.openSideMenu} />
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
              text: this.props.title,
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
