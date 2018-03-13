import React from "react";
import { Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import { observer, inject } from "mobx-react";

const Avatar = ({ src, size, onPress, styles }) => {
  size = size || 40;

  const style = {
    height: size,
    width: size,
    borderRadius: size / 2
  };

  return (
    <TouchableOpacity
      onPress={e => {
        onPress && onPress();
      }}
    >
      <Image style={[style, styles]} source={{ uri: src }} />
    </TouchableOpacity>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
  styles: PropTypes.object
};

export default Avatar;
