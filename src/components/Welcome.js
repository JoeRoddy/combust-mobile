import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import { stores } from "../.combust/init";
import welcomeStore from "../stores/WelcomeStore";
import userStore from "../stores/UserStore";
import { codeText } from "../assets/styles/GlobalStyles";
import Header from "./reusable/Header";
import nav from "../helpers/NavigatorHelper";

@observer
export default class Welcome extends React.Component {
  componentDidMount() {
    welcomeStore.isFirebaseConfigured();
    welcomeStore.isEmailAuthEnabled();
  }

  render() {
    const { firebaseConfigured, emailAuthEnabled, projectId } = welcomeStore;
    const user = userStore.user;

    return (
      <View>
        <Header title="Welcome" />
        <View style={styles.screenContent}>
          {!firebaseConfigured && <ConfigureFirebase />}
          {firebaseConfigured && !emailAuthEnabled && <EnableAuthentication />}
          {firebaseConfigured &&
            emailAuthEnabled &&
            !user && <CreateInitialUser />}
          {firebaseConfigured &&
            emailAuthEnabled &&
            user && <ExecuteGenerate user={user} />}
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

const ConfigureFirebase = () => {
  return (
    <View>
      <Text>Welcome to your combust app!</Text>
      <Text>To get started:</Text>
      <Button
        title="Create a new Firebase project"
        onPress={() => {
          Linking.openURL("https://console.firebase.google.com");
        }}
      />
      <Text>
        then execute <Text style={codeText}>combust configure</Text> from your
        terminal, then restart the application with{" "}
        <Text style={codeText}>npm start</Text>
      </Text>
    </View>
  );
};

const EnableAuthentication = () => {
  return (
    <View>
      <Text>Awesome, looks like firebase is hooked up.</Text>
      <Text>Next, enable email/password authentication</Text>
      <Button
        title="Enable Email Auth"
        onPress={() => {
          Linking.openURL(
            `https://console.firebase.google.com/u/0/project/${projectId}/authentication/providers`
          );
        }}
      />
    </View>
  );
};

const CreateInitialUser = () => {
  return (
    <View>
      <Text>Awesome, now create your first user</Text>
      <Button
        title="Register"
        onPress={() => {
          nav.navigate("Register");
        }}
      />
    </View>
  );
};

const ExecuteGenerate = ({ user }) => {
  return (
    <View>
      <Text>You're logged in! email: {user.email}</Text>
      <Button
        title="Go to Screen 1"
        onPress={() => nav.navigate("ScreenOne")}
      />
    </View>
  );
};
