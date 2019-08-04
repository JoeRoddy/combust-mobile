import React, { Component } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { Input } from "react-native-elements";

import userStore from "../../stores/userStore";
import nav from "../../helpers/navigatorHelper";
import { Screen } from "../reusable";
import UserList from "../users/UserList";

export default class UserSearch extends Component {
  state = {
    query: "",
    results: []
  };

  handleInput = query => {
    this.setState({ query }, () => this.searchForUsers(query));
  };

  searchForUsers = async query => {
    try {
      const results = await userStore.searchByField(query, "email");
      this.setState({ results, isLoading: false });
    } catch (error) {
      if (error.message.includes("Failed to fetch")) {
        return prompt(
          "Install the user search feature first!\nIn the console, execute:",
          "combust install user-search"
        );
      }
    }
  };

  render() {
    return (
      <Screen title="Find Users" noPadding>
        <Input
          containerStyle={{ paddingHorizontal: 0 }}
          inputStyle={styles.horizPad}
          rightIconContainerStyle={styles.horizPad}
          placeholder="Search for users.."
          onChangeText={this.handleInput}
          onSubmitEditing={Keyboard.dismiss}
          value={this.state.query}
          rightIcon={{ name: "search", color: "grey" }}
          autoFocus
        />
        <UserList
          title="Friends"
          users={this.state.results}
          onUserPressed={user => {
            Keyboard.dismiss();
            nav.navigate("Profile", { id: user.id });
          }}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  horizPad: { paddingHorizontal: 10 }
});
