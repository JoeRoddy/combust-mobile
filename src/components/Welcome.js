import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { observer } from "mobx-react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import { textStyles } from "../assets/styles/AppStyles";
import { storeItem, getItem } from "../helpers/CacheHelper";
import userStore from "../stores/UserStore";
import nav from "../helpers/NavigatorHelper";
import { Button, Screen } from "./reusable";

@observer
export default class Welcome extends React.Component {
  state = {
    firebaseConfigured: false,
    emailAuthEnabled: false,
    friendsAdded: false,
    projectId: null
  };

  componentDidMount() {
    this.isFirebaseConfigured(this.isEmailAuthEnabled);
  }

  isFirebaseConfigured(callback) {
    try {
      firebase.database();
      const projectId = firebase.app().options.projectId;
      this.setState({ firebaseConfigured: true, projectId }, callback);
    } catch (err) {
      this.setState({ firebaseConfigured: false }, callback);
    }
  }

  isEmailAuthEnabled() {
    if (!this.state.firebaseConfigured) return;
    const authEnabledForApp =
      firebase.app().options.projectId + "_emailAuthEnabled";

    getItem(authEnabledForApp, (err, emailAuthVerified) => {
      if (emailAuthVerified) {
        return this.setState({ emailAuthEnabled: true });
      }

      const testEmail = "comsttests@combust.com";
      firebase
        .auth()
        .createUserWithEmailAndPassword(testEmail, "sparky")
        .then(() => {
          storeItem(authEnabledForApp, true);
          this.setState({ emailAuthEnabled: true });
        })
        .catch(err => {
          this.setState({
            emailAuthEnabled: err.code === "auth/email-alrady-in-use"
          });
          storeItem(authEnabledForApp, this.state.emailAuthEnabled);
        })
        .then(() => {
          const user = firebase.auth().currentUser;
          if (user && user.email === testEmail) {
            user.delete();
          }
        });
    });
  }

  render() {
    const { emailAuthEnabled, firebaseConfigured, projectId } = this.state;
    const user = userStore.user;

    return (
      <Screen title="Welcome">
        {!firebaseConfigured && <ConfigureFirebase />}
        {firebaseConfigured &&
          !emailAuthEnabled && <EnableAuthentication projectId={projectId} />}
        {firebaseConfigured &&
          emailAuthEnabled &&
          !user && <CreateInitialUser />}
        {firebaseConfigured &&
          emailAuthEnabled &&
          user && <ExecuteGenerate user={user} />}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});

const ConfigureFirebase = () => {
  return (
    <ScrollView>
      <Card
        title="1) Create a Firebase Project"
        image={{ uri: "https://firebase.google.com/images/social.png" }}
      >
        <Text style={{ marginBottom: 10 }}>
          Create a project on Firebase, it works with any Google account and
          takes less than a minute
        </Text>
        <Button
          icon={{ type: "font-awesome", name: "database" }}
          backgroundColor="#FFA000"
          onPress={() => {
            Linking.openURL("https://console.firebase.google.com");
          }}
          title="Create Project"
        />
      </Card>
      <Card title="2) Configure Locally">
        <Text style={{ fontWeight: "bold" }}>From your terminal:</Text>
        <Text>
          Execute <Text style={textStyles.code}>combust configure</Text>{" "}
        </Text>
        <Text>
          Close the app then restart with{" "}
          <Text style={textStyles.code}>npm start</Text>
        </Text>
      </Card>
    </ScrollView>
  );
};

const EnableAuthentication = ({ projectId }) => {
  return (
    <View>
      <Text>Awesome, looks like firebase is hooked up.</Text>
      <Text>Next, enable email/password authentication</Text>
      <Button
        secondary
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
      <Text style={{ margin: 10 }}>Awesome, now create your first user</Text>
      <Button
        secondary
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
      <Text style={{ margin: 10 }}>You're logged in! email: {user.email}</Text>
      <Button
        secondary
        title="Go to Screen 1"
        onPress={() => nav.navigate("ScreenOne")}
      />
    </View>
  );
};
