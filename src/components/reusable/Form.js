import React, { Component } from "react";
import { StyleSheet, View, Keyboard, Image } from "react-native";
import { FormInput, Text, CheckBox } from "react-native-elements";

import { Button, TextArea } from "../reusable";
import { colors } from "../../assets/styles/AppStyles";
import { uploadImgAndGetUrl } from "../../helpers/imageHelper";

export default class Form extends Component {
  state = {};

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  submitForm = e => {
    Keyboard.dismiss();
    e.preventDefault();
    const { fields, onSubmit } = this.props;
    let formData = {};
    fields &&
      Object.keys(fields).forEach(field => {
        let val = this.state[field];
        if (val || val === false) {
          val = fields[field] === "number" ? parseInt(val, 0) : val;
          formData[camelCase(field)] = val;
        } else if (fields[field] === "boolean") {
          formData[camelCase(field)] = false; //bools false by default
        }
      });
    onSubmit(formData);
  };

  uploadImage = async field => {
    const uploadStatus = field + "_uploadStatus";
    uploadImgAndGetUrl("images/", (err, url) => {
      if (!this._mounted) {
        return;
      }
      err
        ? this.setState({ errMessage: err.message, [uploadStatus]: null })
        : this.setState({ [field]: url, [uploadStatus]: "Upload complete" });
    });
  };

  getInputValue = field => {
    const { defaultValues } = this.props;
    const cameled = camelCase(field);

    return this.state[field] != null
      ? this.state[field]
      : defaultValues && defaultValues[field]
      ? defaultValues[field]
      : defaultValues && defaultValues[cameled]
      ? defaultValues[cameled]
      : "";
  };

  render() {
    const {
      fields,
      defaultValues,
      submitText,
      title,
      onCancel,
      cancelText,
      submitStyle,
      style
    } = this.props;

    return (
      <View style={style}>
        {title && (
          <Text h4 style={styles.formLabel}>
            {title}
          </Text>
        )}
        {fields &&
          Object.keys(fields).map((field, i) => (
            <RenderInputFieldForDataType
              key={i}
              that={this}
              dataType={fields[field]}
              fieldName={field}
            />
          ))}
        <Button
          success
          title={submitText || "Submit"}
          onPress={this.submitForm}
          containerViewStyle={[{ marginVertical: 10 }, submitStyle]}
        />
        {onCancel && (
          <Button danger title={cancelText || "Cancel"} onPress={onCancel} />
        )}
        {this.props.children}
        {this.state.errMessage && (
          <Text style={{ color: "red" }}>{this.state.errMessage}</Text>
        )}
      </View>
    );
  }
}

const RenderInputFieldForDataType = props => {
  switch (props.dataType) {
    case "image":
      return <RenderImageInput {...props} />;
    case "number":
      return <RenderNumberInput {...props} />;
    case "boolean":
      return <RenderBooleanInput {...props} />;
    case "text":
      return <RenderTextAreaInput {...props} />;
    default:
      return <RenderStringInput {...props} />;
  }
};

const RenderStringInput = ({ fieldName, that }) => (
  <FormInput
    placeholder={prettyCase(fieldName)}
    onChangeText={newVal => that.setState({ [fieldName]: newVal })}
    secureTextEntry={fieldName.toLowerCase() === "password"}
    onSubmitEditing={Keyboard.dismiss}
    value={that.getInputValue(fieldName)}
  />
);

const RenderTextAreaInput = ({ fieldName, that }) => (
  <TextArea
    placeholder={prettyCase(fieldName)}
    onChangeText={newVal => that.setState({ [fieldName]: newVal })}
    onSubmitEditing={Keyboard.dismiss}
    value={that.getInputValue(fieldName)}
    maxHeight={150}
  />
);

const RenderNumberInput = ({ fieldName, that }) => (
  <FormInput
    keyboardType="numeric"
    placeholder={prettyCase(fieldName)}
    onChangeText={newVal => that.setState({ [fieldName]: newVal })}
    secureTextEntry={fieldName.toLowerCase() === "password"}
    onSubmitEditing={Keyboard.dismiss}
    value={`${that.getInputValue(fieldName)}`}
  />
);

const RenderBooleanInput = ({ fieldName, that }) => {
  const isChecked = that.state[fieldName] || false;
  return (
    <CheckBox
      title={prettyCase(fieldName)}
      checked={isChecked}
      onPress={() => {
        that.setState({ [fieldName]: !isChecked });
      }}
    />
  );
};

const RenderImageInput = ({ fieldName, that }) => (
  <View>
    <View style={{ marginLeft: 25 }}>
      {that.state[fieldName + "_uploadStatus"] && (
        <Text>
          {prettyCase(fieldName)}: {that.state[fieldName + "_uploadStatus"]}
        </Text>
      )}
      {that.state[fieldName] && (
        <Image
          style={{ height: 50, width: 50, marginTop: 20, marginBottom: 20 }}
          source={{ uri: that.state[fieldName] }}
        />
      )}
    </View>
    <Button
      secondary
      title={`${that.state[fieldName] ? "Change" : "Upload"} ${prettyCase(
        fieldName
      )}`}
      onPress={() => that.uploadImage(fieldName)}
    />
  </View>
);

const styles = StyleSheet.create({
  formLabel: {
    color: colors.secondary,
    textAlign: "left",
    marginLeft: 20
  }
});

const prettyCase = str => {
  if (!str.includes(" ")) {
    str = str.replace(/([A-Z])/g, " $1");
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

const camelCase = str => {
  if (str.includes(" ")) {
    str = str
      .toLowerCase()
      .replace(/[^A-Za-z0-9]/g, " ")
      .split(" ")
      .reduce((result, word) => result + capitalize(word.toLowerCase()));
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
};

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
