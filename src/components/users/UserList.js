import React from "react";
import { observer } from "mobx-react";
import { View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";

export default (UserList = observer(({ users, onUserClicked }) => {
  let userArr = typeof users === "array" ? users : Object.values(users);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <List containerStyle={{ marginTop: 0 }}>
        {users &&
          users.map((user, i) => {
            return user ? (
              <ListItem
                key={i}
                avatar={{ uri: user.iconUrl }}
                roundAvatar
                title={user.displayName}
                onPress={() => onUserClicked(user)}
                underlayColor="#edeff2"
                rightIcon={
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 15 / 2,
                      backgroundColor: user.isOnline ? "#67f391" : "gray"
                    }}
                  />
                }
              />
            ) : (
              <View />
            );
          })}
      </List>
    </ScrollView>
  );
}));
