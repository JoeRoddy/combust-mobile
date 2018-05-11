import React, { Component } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { Icon, Header as RneHeader } from "react-native-elements";
import { observer } from "mobx-react";

import { colors } from "../../assets/styles/AppStyles";
import nav from "../../helpers/NavigatorHelper";

@observer
export default class Header extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentDidUpdate(prevProps) {
    if (this.props.goBack) {
      BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      BackHandler.addEventListener("hardwareBackPress", function() {
        this.props.goBack();
      });
    } else {
      BackHandler.addEventListener("hardwareBackPress", this.goBack);
    }
  }

  goBack = () => {
    if (this.props.goBack) {
      this.props.goBack();
      return true;
    } else {
      nav.goBack();
      return true;
    }
  };

  render() {
    const cur = nav.getCurrentRoute();
    const routeName = cur && cur.routeName;

    return (
      <View style={styles.container}>
        {this.props.renderNav ? (
          this.props.renderNav()
        ) : (
          <RneHeader
            statusBarProps={{ barStyle: "light-content" }}
            leftComponent={
              routeName === "Home" ? (
                <Icon name="menu" color="blue" onPress={nav.openSideMenu} />
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
            backgroundColor={colors.primary}
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
