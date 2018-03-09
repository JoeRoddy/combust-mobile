import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { Button } from "react-native-elements";
import { observer } from "mobx-react";

import welcomeStore from "../stores/WelcomeStore";
import userStore from "../stores/UserStore";
import { stores } from "../.combust/init";
import Login from "./users/Login";
import { Divider } from "react-native-elements";
import { codeText } from "../assets/styles/GlobalStyles";

@observer
export default class Welcome extends React.Component {
  componentDidMount() {
    welcomeStore.isFirebaseConfigured();
    welcomeStore.isEmailAuthEnabled();
  }

  render() {
    const { firebaseConfigured, emailAuthEnabled, projectId } = welcomeStore;
    const user = userStore.user;
    console.log("firebaseConf:", firebaseConfigured);
    // console.log("projId:", projectId);
    // console.log("emailAuthEnabled: ", emailAuthEnabled);
    // console.log("user:", user);

    return (
      <View style={styles.container}>
        <Divider />
        {!firebaseConfigured && (
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
              then execute <Text style={codeText}>combust configure</Text> from
              your terminal
            </Text>
          </View>
        )}
        {firebaseConfigured &&
          !emailAuthEnabled && (
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
          )}
        {firebaseConfigured &&
          emailAuthEnabled &&
          !user && (
            <View>
              <Text>Awesome, now create your first user</Text>
              <Button
                title="Register"
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              />
            </View>
          )}
        {firebaseConfigured &&
          emailAuthEnabled &&
          user && (
            <View>
              <Text>You're logged in! email: {user.email}</Text>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
