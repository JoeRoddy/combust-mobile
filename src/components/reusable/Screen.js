import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Header } from "../reusable";

export default (Screen = ({ children, title }) => {
  return (
    <Fragment>
      <Header title={title} />
      <View style={{ padding: 10 }}>{children}</View>
    </Fragment>
  );
});

Screen.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
