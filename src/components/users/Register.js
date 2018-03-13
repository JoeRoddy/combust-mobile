import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import userStore from "../../stores/UserStore";
import Form from "../reusable/Form";
import nav from "../../helpers/NavigatorHelper";
import { primary, secondary } from "../../assets/styles/GlobalStyles";

const fields = {
  //legal data types: string, text, number, boolean, image
  Email: "string",
  Password: "string"
};

@observer
export default class Register extends Component {
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
        <Text style={[primary, [styles.appName]]}>Your App</Text>
        {user && <Text>You already have an account.</Text>}
        <Form
          style={styles.regForm}
          onSubmit={this.handleSubmit}
          submitText="Sign Up"
          fields={fields}
          title="Register"
        />
        <Button
          title="Login instead"
          raised
          backgroundColor={secondary.color}
          //   buttonStyle={{ marginTop: 10 }}
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center"
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center"
  },
  regForm: {
    marginTop: 30
  }
});
