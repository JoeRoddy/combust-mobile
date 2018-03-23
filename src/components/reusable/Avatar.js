import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import { observer, inject } from "mobx-react";

const Avatar = ({ src, size, onPress, online, styles }) => {
  size = size || 40;

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2
  };

  return (
    <View>
      <TouchableOpacity
        onPress={e => {
          onPress && onPress();
        }}
      >
        <Image style={[style, styles]} source={{ uri: src }} />
        {(online || online === false) && ( // prop was provided
          <OnlineIndicator online={online} size={size} />
        )}
      </TouchableOpacity>
    </View>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
  styles: PropTypes.object
};

export default Avatar;

const OnlineIndicator = ({ online, size }) => {
  let height = size / 4;
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: online ? "#67f391" : "gray",
        borderRadius: height / 2,
        height,
        width: height
      }}
    />
  );
};
