import React from "react";
import { observer } from "mobx-react";
import { View } from "react-native";
import { List, ListItem } from "react-native-elements";

export default (UserList = observer(({ users, onUserClicked }) => {
  return (
    <List>
      {users &&
        Object.keys(users).map((userId, i) => {
          const user = users[userId];
          if (!user) {
            return <View />;
          }
          return (
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
          );
        })}
    </List>
  );
}));
