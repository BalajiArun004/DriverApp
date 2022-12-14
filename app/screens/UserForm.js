import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import React, { Component } from "react";
import edit_icon from "../assets/images/edit.png";
import { SharedService } from "../services/SharedService";
import { ApiService } from "../services/ApiServices";
export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAction: false,
      UserData: SharedService.selectedUser,
      formValues: { ...SharedService.selectedUser } || {},
      Editable: !SharedService.selectedUser,
    };
  }
  handleChange(input) {
    const { name, value } = input;
    this.setState({ formValues: { ...this.state.formValues, [name]: value } });
  }

  submitData = () => {
    setTimeout(async () => {
      if (SharedService.selectedUser) {
        const response = await ApiService.makeAPICall({
          endpoint: SharedService.isDriverSelected ? "editDriver" : "editSA",
          body: {
            ...this.state.formValues,
            Status: "ACTIVE",
          },
        }).then((res) => {
          Alert.alert("User Edited Successfully...");
          this.props.navigation.navigate(
            SharedService.isDriverSelected ? "Driver" : "SA"
          );
        });
      } else {
        const response = await ApiService.makeAPICall({
          endpoint: SharedService.isDriverSelected
            ? "createDriver"
            : "createSA",
          body: {
            ...this.state.formValues,
            Status: "ACTIVE",
          },
        }).then((res) => {
          Alert.alert("User created Successfully...");
          this.props.navigation.navigate(
            SharedService.isDriverSelected ? "Driver" : "SA"
          );
        });
      }
    }, 100);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>
            {(SharedService.selectedUser ? "EDIT" : "CREATE") +
              (SharedService.isDriverSelected
                ? " DRIVERS"
                : " SERVICE ADVISOR")}
          </Text>
          {this.state.UserData ? (
            <TouchableOpacity
              style={{
                paddingRight: 20,
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                this.setState({
                  Editable: !this.state.Editable,
                })
              }
            >
              <Image source={edit_icon}></Image>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.input_wrapper}>
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            value={this.state.formValues?.FirstName}
            variant="outlined"
            label="First Name"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "FirstName", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            value={this.state.formValues?.LastName}
            variant="outlined"
            label="Last Name"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "LastName", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            value={this.state.formValues?.ContactNumber}
            variant="outlined"
            label="Mobile"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "ContactNumber", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            value={this.state.formValues?.Email}
            variant="outlined"
            label="Email / User ID"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "Email", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Password"
            variant="outlined"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "Password", value: text })
            }
          />
        </View>
        <View style={styles.button_wrapper}>
          <Button
            onPress={() =>
              this.props.navigation.navigate(
                SharedService.isDriverSelected ? "Driver" : "SA"
              )
            }
            title="CANCEL"
            color="#B8B7B7"
            tintColor="white"
            style={styles.button_cancel}
          ></Button>
          <Button
            onPress={() => this.submitData()}
            title={SharedService.isDriverSelected ? "SAVE DRIVER" : "SAVE SA"}
            color="#0060AF"
            tintColor="white"
            style={styles.button_save}
          ></Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    padding: 10,
  },
  input_wrapper: {},
  input: {
    height: 60,
    margin: 10,
    paddingVertical: 20,
    width: "95%",
  },
  button_wrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  button_save: {
    height: 50,
    width: 170,
    margin: 12,
    borderWidth: 1,
    borderColor: "#265E92",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "#0060AF",
  },
  button_cancel: {
    height: 50,
    width: 170,
    margin: 12,
    borderWidth: 1,
    borderColor: "#B8B7B7",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "#B8B7B7",
  },
});
