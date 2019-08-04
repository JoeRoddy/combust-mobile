import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Header } from "./";

export default (Screen = ({
  children,
  title,
  containerStyle,
  style,
  noPadding
}) => {
  return (
    <View style={containerStyle}>
      <Header title={title} />
      <View style={[{ padding: noPadding ? 0 : 20 }, style]}>{children}</View>
    </View>
  );
});

Screen.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  noPadding: PropTypes.bool,
  style: PropTypes.object
};
