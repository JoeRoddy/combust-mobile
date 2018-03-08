import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput, Button, Text } from "react-native-elements";
// import Loading from "./Loading";
import Form from "../reusable/Form";
import { observer } from "mobx-react";
import userStore from "../../stores/UserStore";

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
    loaded: true
  };

  static navigationOptions = {
    title: "Logout"
  };

  componentWillMount() {}

  componentDidMount() {}

  login = () => {
    const that = this;
    const credentials = {
      email: this.state.email.trim(),
      password: this.state.password.trim()
    };
  };

  render() {
    return this.state.loaded ? (
      <KeyboardAvoidingView behavior="padding" style={styles.view}>
        <Text style={styles.appName}>Your App</Text>
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
          title="Create an Account"
          onPress={e => this.props.navigation.navigate("Register")}
        />
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
