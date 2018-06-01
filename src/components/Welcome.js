import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { observer } from "mobx-react";

import { textStyles, viewStyles } from "../assets/styles/AppStyles";
import { stores } from "../.combust/init";
import welcomeStore from "../stores/WelcomeStore";
import userStore from "../stores/UserStore";
import nav from "../helpers/NavigatorHelper";
import { Button, Header } from "./reusable";

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
      <View style={{ flex: 1 }}>
        <Header title="Welcome" />
        <View style={[viewStyles.padding, { flex: 1 }]}>
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

const EnableAuthentication = () => {
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
