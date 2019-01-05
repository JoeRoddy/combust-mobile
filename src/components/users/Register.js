import React, { Component } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { observer } from "mobx-react";

import userStore from "../../stores/UserStore";
import nav from "../../helpers/NavigatorHelper";
import { colors } from "../../assets/styles/AppStyles";
import { Button, Form } from "../reusable";

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

class Register extends Component {
  state = {
    errMessage: null
  };

  componentDidUpdate(nextProps) {
    if (userStore.user) {
      nav.navigate("Home");
    }
  }

  handleSubmit = formData => {
    userStore.createUser(formData, (err, userData) => {
      if (err) {
        this.setState({ errMessage: err.message });
      } else {
        nav.navigate("Home");
      }
    });
  };

  render() {
    const user = userStore.user;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.view}>
        <Text style={styles.appName}>Your App</Text>
        {user && <Text>You already have an account.</Text>}
        <Form
          style={styles.regForm}
          onSubmit={this.handleSubmit}
          submitText="Sign Up"
          fields={fields}
          title="Register"
        />
        <Button
          title="Login Instead"
          secondary
          onPress={e => nav.navigate("Login")}
        />
        {this.state.errMessage && (
          <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
            {this.state.errMessage}
          </Text>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default observer(Register);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center"
  },
  appName: {
    color: colors.primary,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  },
  regForm: {
    marginTop: 30
  }
});
