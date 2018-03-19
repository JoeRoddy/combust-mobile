import React, { Component } from "react";
import {
  StyleSheet,
  Linking,
  View,
  Keyboard,
  TextInput,
  Image
} from "react-native";
import { FormInput, Text, Button } from "react-native-elements";

import { firebaseConfig } from "../../.combust/config";
import { successColor, secondary } from "../../assets/styles/GlobalStyles";
import { uploadImgAndGetUrl } from "../../helpers/ImageHelper";
import { uploadDocument } from "../../db/FileDb";

export default class Form extends Component {
  state = {};

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
        }
      });
    onSubmit(formData);
  };

  uploadImage = field => {
    const uploadStatus = field + "_uploadStatus";

    uploadImgAndGetUrl("images/", (err, res) => {
      console.log("res:", res);

      err
        ? this.setState({ errMessage: err.message })
        : res.status === "completed"
          ? this.setState({ [field]: res.url, [uploadStatus]: "completed" })
          : this.setState({ [uploadStatus]: res.status });
    });
  };

  getInputValue = field => {
    const { defaultValues } = this.props;
    const cameled = camelCase(field);

    return this.state[field] != null
      ? this.state[field]
      : defaultValues && defaultValues[field]
        ? defaultValues[field]
        : defaultValues && defaultValues[cameled] ? defaultValues[cameled] : "";
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
          <Text h4 style={[secondary, styles.formLabel]}>
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
          backgroundColor={successColor}
          raised
          title={submitText || "Submit"}
          onPress={this.submitForm}
          containerViewStyle={{ marginTop: 10, marginBottom: 10 }}
        />
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
    default:
      return <RenderStringInput {...props} />;
  }
};

const RenderStringInput = ({ fieldName, that }) => (
  <FormInput
    placeholder={fieldName}
    onChangeText={newVal => that.setState({ [fieldName]: newVal })}
    secureTextEntry={fieldName.toLowerCase() === "password"}
    onSubmitEditing={Keyboard.dismiss}
    value={that.getInputValue(fieldName)}
  />
);

const RenderImageInput = ({ fieldName, that }) => (
  <View>
    <View style={{ marginLeft: 25 }}>
      {that.state[fieldName + "_uploadStatus"] && (
        <Text>Upload: {that.state[fieldName + "_uploadStatus"]}</Text>
      )}
      {that.state[fieldName] && (
        <Image
          style={{ height: 50, width: 50, marginTop: 20, marginBottom: 20 }}
          source={{ uri: that.state[fieldName] }}
        />
      )}
    </View>
    <Button
      backgroundColor={secondary.color}
      title={`${that.state[fieldName] ? "Change" : "Upload"} ${capitalize(
        fieldName
      )}`}
      onPress={() => that.uploadImage(fieldName)}
    />
  </View>
);

const styles = StyleSheet.create({
  formLabel: {
    textAlign: "left",
    marginLeft: 20
  }
});

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
