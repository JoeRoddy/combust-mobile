import React, { Component } from "react";
import { observer } from "mobx-react";
import { View, Keyboard } from "react-native";
import { Icon, FormInput } from "react-native-elements";

import userDb from "../../db/UserDb";
import nav from "../../helpers/NavigatorHelper";
import { Screen } from "../reusable";
import UserList from "../users/UserList";

export default class UserSearch extends Component {
  state = {
    query: "",
    results: []
  };

  handleQuery = query => {
    let results = userDb.searchByField(query, "displayName");
    this.setState({ results, query });
  };

  render() {
    return (
      <Screen title="Find Users" noPadding>
        <FormInput
          placeholder="Search for users.."
          onChangeText={this.handleQuery}
          onSubmitEditing={Keyboard.dismiss}
          value={this.state.query}
          autoFocus
        />
        <UserList
          title="Friends"
          users={this.state.results}
          onUserClicked={user => {
            Keyboard.dismiss();
            nav.navigate("Profile", { id: user.id });
          }}
        />
      </Screen>
    );
  }
}
