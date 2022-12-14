import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "@react-native-material/core";
import React, { Component } from "react";
import filter_icon from "../assets/images/filter.png";
import search_icon from "../assets/images/search.png";
import add_icon from "../assets/images/add.png";
import { SharedService } from "../services/SharedService";
import { ApiService } from "../services/ApiServices";
import { withNavigation } from "react-navigation";
import Jobcard from "../components/jobcard";
class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAction: false,
    };
    this.fetchUserDetails();
  }
  componentDidMount() {
    this.fetchUserDetails();
    unsubscribe = this.props.navigation.addListener("focus", () => {
      this.fetchUserDetails();
    });
  }

  componentWillUnmount() {
    this.unsubscribe?.remove();
  }

  fetchUserDetails() {
    ApiService.makeAPICall({
      endpoint: "listJob",
      body: {},
    }).then((res) => {
      this.setState({
        rows: res.data,
      });
    });
  }
  setUserForEdit(user) {
    SharedService.selectedUser = user;
    this.props.navigation.navigate(
      SharedService.isDriverSelected ? "CreateDriver" : "CreateSA"
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>JOBS LIST</Text>
        <View style={styles.button_wrapper}>
          <TextInput variant="outlined" color="#80AFD7" style={styles.input} />
          <TouchableOpacity onPress={() => this.fetchUserDetails()}>
            <Image source={search_icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={filter_icon}></Image>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.list_wrapper}>
          {this.state.rows?.map((row, index) => {
            return (
              <TouchableOpacity key={index}>
                <Jobcard data={row}></Jobcard>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            this.setState({
              createAction: true,
            });
            SharedService.selectedUser = null;
            this.props.navigation.navigate("CreateJob");
          }}
        >
          <Image source={add_icon}></Image>
        </TouchableOpacity>
      </View>
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
  input: {
    height: 60,
    margin: 10,
    width: "72%",
  },
  button_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
  list_wrapper: {
    flex: 1,
    paddingHorizontal: 5,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});

export default withNavigation(JobList);
