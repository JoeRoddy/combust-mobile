import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Button, Icon, Card } from "react-native-elements";
import { observer } from "mobx-react";

import { viewStyles, textStyles, colors } from "../../assets/styles/AppStyles";
import userStore from "../../stores/UserStore";
import nav from "../../helpers/NavigatorHelper";
import { Avatar, Screen } from "../reusable";

@observer
export default class Profile extends Component {
  openConversationWithUser = userId => {
    alert("Execute from your terminal:", "combust install chat");
  };

  followUser = userId => {
    alert("Execute from your terminal:", "combust install followers");
  };

  sendFriendRequest = userId => {
    alert("Execute from your terminal:", "combust install friends");
  };

  render() {
    const routeInfo = nav.getCurrentRoute();
    const userId = routeInfo && routeInfo.params && routeInfo.params.id;
    const user = userStore.getUserById(userId);

    return user ? (
      <Screen
        title={user.displayName || "Profile"}
        style={{ flex: 1, padding: 0 }}
        containerStyle={{ flex: 1 }}
      >
        <ScrollView>
          <CoverPhoto />
          <UserActionBar that={this} userId={userId} />
          <AvatarAndName user={user} />
          <ExamplePosts user={user} />
        </ScrollView>
      </Screen>
    ) : (
      <View />
    );
  }
}

const CoverPhoto = () => (
  <Image
    style={{ height: 130 }}
    source={{
      uri:
        "https://images.pexels.com/photos/207529/pexels-photo-207529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
    }}
  />
);

const AvatarAndName = ({ user }) => (
  <View style={styles.iconAndName}>
    <Avatar
      size={80}
      online={user.isOnline}
      src={user.iconUrl}
      icon={user.isOnline ? "online" : "offline"}
    />
    <View
      style={{
        marginLeft: 10,
        justifyContent: "center"
      }}
    >
      <Text style={[styles.displayName, { marginBottom: 8 }]}>
        {user.displayName}
      </Text>
    </View>
  </View>
);

const UserActionBar = observer(({ that, userId }) => {
  const isMyProfile = userId === userStore.userId;
  const friendType = null;
  const isFollowed = false;
  return isMyProfile ? (
    <View style={styles.actionBar}>
      <Text>Your Profile</Text>
    </View>
  ) : (
    <View style={styles.actionBar}>
      <BarAction
        text="Chat"
        icon="chat"
        onPress={() => that.openConversationWithUser(userId)}
      />
      {isFollowed ? (
        <View style={styles.rowCentered}>
          <Icon name="done" color={colors.success} size={13} />
          <Text style={styles.actionBarText}>Following</Text>
        </View>
      ) : (
        <BarAction
          text="Follow"
          icon="person-add"
          onPress={() => that.followUser(userId)}
        />
      )}
      {!friendType || friendType === "non_friend" ? (
        <BarAction
          text="Add Friend"
          icon="person-add"
          onPress={() => that.sendFriendRequest(userId)}
        />
      ) : (
        <View style={styles.rowCentered}>
          {friendType === "friend" && (
            <Icon name="done" color={colors.success} size={13} />
          )}
          <Text style={styles.actionBarText}>
            {friendType === "friend" ? "Friends" : "Request Sent"}
          </Text>
        </View>
      )}
    </View>
  );
});

const BarAction = ({ text, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowCentered}>
    <Icon name={icon} color="black" size={15} />
    <Text style={styles.actionBarText}>{text}</Text>
  </TouchableOpacity>
);

const ExamplePosts = ({ user }) => (
  <ScrollView style={{ marginBottom: 10 }}>
    {[0, 1, 2, 3, 4].map(i => (
      <Card
        key={i}
        title={user.displayName + " @ 2:05 pm"}
        containerStyle={{ borderRadius: 3 }}
      >
        <Text>
          Execute
          <Text style={textStyles.code}> combust install posts </Text> to start
          creating posts
        </Text>
      </Card>
    ))}
  </ScrollView>
);

const alert = (title, message, onPress) => {
  Alert.alert(
    title,
    message,
    [{ text: "OK", onPress: typeof onPress === "function" ? onPress : null }],
    {
      cancelable: false
    }
  );
};

const styles = StyleSheet.create({
  coverImage: {
    marginTop: 130
  },
  displayName: {
    color: "white",
    fontSize: 22,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 }
  },
  iconAndName: {
    flexDirection: "row",
    position: "absolute",
    top: 80,
    left: 20
  },
  actionBar: {
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 15
  },
  actionBarText: {
    fontSize: 15,
    marginLeft: 1
  },
  rowCentered: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  }
});
