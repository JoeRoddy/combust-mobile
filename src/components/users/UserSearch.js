import React, { Component } from "react";
import { observer } from "mobx-react";
import { View, Keyboard } from "react-native";
import { Icon, FormInput } from "react-native-elements";

import userDb from "../../db/UserDb";
import UserList from "../users/UserList";
import Header from "../reusable/Header";
import nav from "../../helpers/NavigatorHelper";

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
      <View style={{ flex: 1 }}>
        <Header title="Find Users" />
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
            nav.navigate("Profile", { userId: user.id });
          }}
        />
      </View>
    );
  }
}
