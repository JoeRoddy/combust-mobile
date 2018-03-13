import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Text } from "react-native-elements";
import { observer } from "mobx-react";

import userStore from "../../stores/UserStore";
import nav from "../../helpers/NavigatorHelper";
import Form from "../reusable/Form";
import { primary, secondary } from "../../assets/styles/GlobalStyles";

const safeErrorCodes = {
  "auth/invalid-email": "Looks like your email is formatted incorrectly.",
  "auth/wrong-password": "Sign in failed, double check your email and password"
};

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

@observer
export default class Login extends Component {
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
        <Text style={[primary, styles.appName]}>Your App</Text>
        {false && <Text>You already have an account.</Text>}
        <Form
          style={styles.login}
          onSubmit={this.login}
          submitText="Login"
          title="Login"
          fields={fields}
        />
        <Button
          raised
          backgroundColor={secondary.color}
          title="Create an Account"
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center"
  },
  login: {
    marginTop: 30
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  }
});
