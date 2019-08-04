import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Text } from "react-native-elements";
import { observer } from "mobx-react";

import nav from "../../helpers/navigatorHelper";
import userStore from "../../stores/userStore";
import { Button, Form } from "../reusable";
import { colors } from "../../assets/styles/AppStyles";

const safeErrorCodes = {
  "auth/invalid-email": "Looks like your email is formatted incorrectly.",
  "auth/wrong-password": "Sign in failed, double check your email and password"
};

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    loaded: true,
    errMsg: null
  };

  static navigationOptions = {
    title: "Logout"
  };

  login = formData => {
    if (!formData || !formData.email || !formData.password) {
      return this.setState({
        errMsg: "Ensure you've provided an email and a password"
      });
    }

    userStore.login(formData, (err, res) => {
      err ? this.setState({ errMsg: err.message }) : nav.navigate("Home");
    });
  };

  render() {
    return this.state.loaded ? (
      <KeyboardAvoidingView behavior="padding" style={styles.view}>
        <Text style={styles.appName}>Your App</Text>
        <Form
          style={styles.login}
          onSubmit={this.login}
          submitText="Login"
          title="Login"
          fields={fields}
        />
        <Button
          title="Create an Account"
          secondary
          onPress={e => nav.navigate("Register")}
        />
        {this.state.errMsg && (
          <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
            {this.state.errMsg}
          </Text>
        )}
      </KeyboardAvoidingView>
    ) : (
      <Text>loading...</Text>
    );
  }
}

export default observer(Login);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15
  },
  login: {
    marginTop: 30
  },
  appName: {
    color: colors.primary,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  }
});
