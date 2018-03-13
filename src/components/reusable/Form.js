import React, { Component } from "react";
import { StyleSheet, Linking, View, Keyboard } from "react-native";
import { FormInput, Text, Button } from "react-native-elements";

import { firebaseConfig } from "../../.combust/config";
import { uploadDocument } from "../../db/FileDb";
import { primary, secondary } from "../../assets/styles/GlobalStyles";

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
    // const image = this.refs[field].files[0];
    // if (!image) return;
    // const imageErr = "Legal images include: jpegs, png";
    // if (!["image/jpeg", "image/png"].includes(image.type)) {
    //   return this.setState({ errMessage: imageErr });
    // }
    // uploadDocument(image, "images/", (err, res) => {
    //   if (err) {
    //     return this.setState({
    //       errMessage:
    //         err.code === "storage/unauthorized" ? (
    //           "User must be logged in to upload files."
    //         ) : (
    //           <View>
    //             <Button
    //               title="Enable storage"
    //               onPress={() => {
    //                 Linking.openURL(
    //                   `https://console.firebase.google.com/project/${
    //                     firebaseConfig.projectId
    //                   }/storage/files`
    //                 );
    //               }}
    //             />
    //             <Text>
    //               then execute: combust configure {firebaseConfig.projectId}
    //             </Text>
    //           </View>
    //         )
    //     });
    //   }
    //   this.setState({ [field]: res.url });
    // });
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
          Object.keys(fields).map(field => {
            const type = fields[field];
            return (
              <FormInput
                key={field}
                placeholder={field}
                onChangeText={newVal => this.setState({ [field]: newVal })}
                secureTextEntry={field.toLowerCase() === "password"}
                onSubmitEditing={Keyboard.dismiss}
              />
            );
          })}
        <Button
          backgroundColor={primary.color}
          raised
          title={submitText || "Submit"}
          onPress={this.submitForm}
          buttonStyle={{ marginTop: 10, marginBottom: 10 }}
        />
        {this.props.children}
        {this.state.errMessage && (
          <Text style={{ color: "red" }}>{this.state.errMessage}</Text>
        )}
      </View>
    );
  }
}

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
