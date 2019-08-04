import React from "react";
import { StyleSheet } from "react-native";
import { Button as RneButton } from "react-native-elements";
import PropTypes from "prop-types";

import { colors } from "../../assets/styles/AppStyles";

//Customize your button!
export default (Button = props => {
  // https://react-native-training.github.io/react-native-elements/docs/0.19.0/button.html#props
  // primary || secondary || success || danger || warning - sets bg color
  const backgroundColor = _getBackgroundColor(props);

  return (
    <RneButton
      {...props}
      raised={true}
      title={props.children || props.title}
      borderRadius={BORDER_RADIUS}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      buttonStyle={[styles.buttonStyle, props.buttonStyle, { backgroundColor }]}
      textStyle={[styles.textStyle, props.textStyle]}
    />
  );
});

Button.propTypes = {
  ...RneButton.propTypes,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool
};

//set to 0 for sharp corners
const BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  //default button styles here
  buttonStyle: {},
  textStyle: {},
  containerStyle: { borderRadius: BORDER_RADIUS, margin: 8 }
});

const _getBackgroundColor = props => {
  const {
    backgroundColor,
    primary,
    secondary,
    success,
    danger,
    warning
  } = props;

  return (
    backgroundColor ||
    (primary && colors.primary) ||
    (secondary && colors.secondary) ||
    (success && colors.success) ||
    (danger && colors.danger) ||
    (warning && colors.warning) ||
    colors.primary
  );
};
