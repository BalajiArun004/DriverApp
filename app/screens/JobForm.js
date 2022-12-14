import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  Pressable,
} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import React, { Component } from "react";
import edit_icon from "../assets/images/edit.png";
import { SharedService } from "../services/SharedService";
import { ApiService } from "../services/ApiServices";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAction: false,
      showDatePicker: false,
      UserData: SharedService.selectedUser,
      formValues: { ...SharedService.selectedUser } || {},
      Editable: !SharedService.selectedUser,
    };
  }
  handleChange(input) {
    const { name, value } = input;
    console.log(
      `🚀 ~ file: JobForm.js:32 ~ JobForm ~ handleChange ~ { name, value }`,
      { name, value }
    );
    this.setState({ formValues: { ...this.state.formValues, [name]: value } });
  }
  changeDate = (event, selectedDate) => {
    this.setState({
      showDatePicker: false,
    });
    this.setState({
      formValues: { ...this.state.formValues, PromisedDate: selectedDate },
    });
  };

  componentDidMount() {
    this.fetchDriverDetails();
    unsubscribe = this.props.navigation.addListener("focus", () => {
      this.fetchDriverDetails();
    });
  }

  componentWillUnmount() {
    this.unsubscribe?.remove();
  }

  fetchDriverDetails() {
    ApiService.makeAPICall({
      endpoint: "listDriver",
      body: {},
    }).then((res) => {
      this.setState({
        drivers: res.data?.map((x) => x.FirstName + x.LastName),
      });
    });
  }

  submitData = () => {
    setTimeout(async () => {
      console.log(this.state.formValues);
      const response = await ApiService.makeAPICall({
        endpoint: "createJob",
        body: {
          ...this.state.formValues,
        },
      }).then((res) => {
        console.log(
          `🚀 ~ file: JobForm.js:77 ~ JobForm ~ setTimeout ~ res`,
          res
        );
        Alert.alert("job created Successfully...");
        this.props.navigation.navigate("JobList");
      });
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
            {(SharedService.selectedUser ? "EDIT" : "CREATE") + " JOB"}
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
          <View style={styles.dropdownWrapper}>
            <SelectDropdown
              data={["Pickup", "Drop"]}
              onSelect={(selectedItem, index) => {
                this.handleChange({ name: "JobType", value: selectedItem });
              }}
              defaultButtonText={"Job Type"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
          <Pressable
            onPress={() => {
              this.setState({
                showDatePicker: true,
              });
            }}
          >
            <TextInput
              editable={false}
              color="#80AFD7"
              value={this.state.formValues?.PromisedDate?.toDateString()}
              variant="outlined"
              label="Select Promised Date*"
              style={styles.input}
              onChangeText={(text) => this.changeDate}
            />
          </Pressable>
          {this.state.showDatePicker && (
            <DateTimePicker
              mode="date"
              value={this.state.formValues?.PromisedDate || new Date()}
              onChange={this.changeDate}
            />
          )}
          <View style={styles.dropdownWrapper}>
            <SelectDropdown
              name="Driver"
              value={this.state.formValues?.Driver}
              data={this.state.drivers}
              onSelect={(selectedItem, index) => {
                this.handleChange({ name: "Driver", value: selectedItem });
              }}
              defaultButtonText={"Select Driver"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            value={this.state.formValues?.OwnerName}
            variant="outlined"
            label="Name of the Owner*"
            style={styles.input}
            onChangeText={(text) =>
              this.handleChange({ name: "OwnerName", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Mobile Number*"
            variant="outlined"
            style={styles.input}
            value={this.state.formValues?.ContactNumber}
            onChangeText={(text) =>
              this.handleChange({ name: "ContactNumber", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Email*"
            variant="outlined"
            style={styles.input}
            value={this.state.formValues?.Email}
            onChangeText={(text) =>
              this.handleChange({ name: "Email", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Address*"
            variant="outlined"
            style={styles.input}
            value={this.state.formValues?.Address}
            onChangeText={(text) =>
              this.handleChange({ name: "Address", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Car Reg.NO*"
            variant="outlined"
            style={styles.input}
            value={this.state.formValues?.CarRegNumber}
            onChangeText={(text) =>
              this.handleChange({ name: "CarRegNumber", value: text })
            }
          />
          <TextInput
            editable={this.state.Editable}
            color="#80AFD7"
            label="Car Model"
            variant="outlined"
            style={styles.input}
            value={this.state.formValues?.CarModel}
            onChangeText={(text) =>
              this.handleChange({ name: "CarModel", value: text })
            }
          />
          <View style={styles.dropdownWrapper}>
            <SelectDropdown
              data={["PM", "GR", "BP"]}
              onSelect={(selectedItem, index) => {
                this.handleChange({ name: "ServiceType", value: selectedItem });
              }}
              defaultButtonText={"Type of Service*"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
        <View style={styles.button_wrapper}>
          <Button
            onPress={() => this.props.navigation.navigate("JobList")}
            title="CANCEL"
            color="#B8B7B7"
            tintColor="white"
            style={styles.button_cancel}
          ></Button>
          <Button
            onPress={() => this.submitData()}
            title={"CREATE JOB"}
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
    paddingTop: 20,
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
  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  dropdownWrapper: {
    width: "95%",
    marginLeft: 12,
    marginTop: 25,
  },
});
