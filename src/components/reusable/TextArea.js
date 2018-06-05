import React, { Component } from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

const MAX_INPUT_HEIGHT = 200;
const MIN_INPUT_HEIGHT = 0;

export default class TextArea extends Component {
  state = {
    inputHeight: 0
  };

  handleContentSizeChange = ({ nativeEvent }) => {
    const maxHeight = this.props.maxHeight || MAX_INPUT_HEIGHT;
    const minHeight = this.props.minHeight || MIN_INPUT_HEIGHT;

    const { height } = nativeEvent.contentSize;
    const inputHeight =
      height > maxHeight ? maxHeight : height < minHeight ? minHeight : height;

    this.setState({ inputHeight });
  };

  render() {
    const heightStyle = {
      height: this.state.inputHeight
    };

    return (
      <TextInput
        multiline
        onSubmitEditing={this.props.onSubmitEditing || Keyboard.dismiss}
        style={[styles.input, this.props.style, heightStyle]}
        onContentSizeChange={this.handleContentSizeChange}
        {...this.props}
      />
    );
  }
}

TextArea.propTypes = {
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  input: {
    paddingBottom: 10,
    marginHorizontal: 12,
    textAlignVertical: "top"
  }
});
