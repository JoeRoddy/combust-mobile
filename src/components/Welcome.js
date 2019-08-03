import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { observer } from "mobx-react";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/auth";

import { textStyles, viewStyles } from "../assets/styles/AppStyles";
import { storeItem, getItem } from "../helpers/cacheHelper";
import userStore from "../stores/userStore";
import nav from "../helpers/navigatorHelper";
import { Button, Screen } from "./reusable";

class Welcome extends React.Component {
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

  async isEmailAuthEnabled() {
    if (!this.state.firebaseConfigured) return;
    const appKey = firebase.app().options.projectId + "_emailAuthEnabled";

    getItem(appKey, async (err, emailAuthVerified) => {
      if (emailAuthVerified) return this.setState({ emailAuthEnabled: true });
      try {
        await _createTempAccountWithEmailPass();
        this.setState({ emailAuthEnabled: true });
        storeItem(appKey, true);
      } catch (err) {
        const emailAuthEnabled = err.code === "auth/email-alrady-in-use";
        this.setState({ emailAuthEnabled });
      }
    });
  }

  render() {
    const { emailAuthEnabled, firebaseConfigured: fb, projectId } = this.state;
    const user = userStore.user;
    const phase = !fb ? 1 : !emailAuthEnabled ? 2 : !user ? 3 : 4;

    return (
      <Screen title="Welcome">
        {phase === 1 && <ConfigureFirebase />}
        {phase === 2 && <EnableAuthentication projectId={projectId} />}
        {phase === 3 && <CreateInitialUser />}
        {phase === 4 && <ExecuteGenerate user={user} />}
      </Screen>
    );
  }
}

export default observer(Welcome);

const styles = StyleSheet.create({});

const ConfigureFirebase = () => (
  <ScrollView>
    <Card
      title="1) Create a Firebase Project"
      image={{ uri: "https://firebase.google.com/images/social.png" }}
    >
      <Text style={{ marginBottom: 10 }}>
        Create a project on Firebase, it works with any Google account and takes
        less than a minute
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

const EnableAuthentication = ({ projectId }) => (
  <View>
    <Text>Awesome, looks like firebase is hooked up.</Text>
    <Text style={viewStyles.padding}>
      Next, enable email/password authentication
    </Text>
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

const CreateInitialUser = () => (
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

const ExecuteGenerate = ({ user }) => (
  <View>
    <Text style={{ margin: 10 }}>You're logged in! email: {user.email}</Text>
    <Button
      secondary
      title="Go to Screen 1"
      onPress={() => nav.navigate("ScreenOne")}
    />
  </View>
);

const _createTempAccountWithEmailPass = () => {
  const testEmail = "deletethisuser@combustjs.org";
  return firebase
    .auth()
    .createUserWithEmailAndPassword(testEmail, "notagoodpassword")
    .finally(() => {
      const user = firebase.auth().currentUser;
      if (user && user.email === testEmail) user.delete();
    });
};
