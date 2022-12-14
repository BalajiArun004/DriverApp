import { Text, Image, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import default_profile from "../assets/images/default_profile.png";
import email_icon from "../assets/images/email.png";
import phone_icon from "../assets/images/phone.png";
import calendar from "../assets/images/calendar.png";

export default class Jobcard extends Component {
  constructor(props) {
    super(props);
  }

  getColorForStatus(status) {
    switch (status?.toLowerCase()) {
      case "assigned":
        return "#0060AF";
      case "completed":
        return "black";
      case "in progress":
        return "#00796B";
      default:
        return "";
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 10,
            flex: 3.5,
            backgroundColor: "#0060AF",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Job No: {this.props.data.JobId}
          </Text>
          <View>
            <Image
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 18,
              }}
              source={calendar}
            ></Image>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#FFFFFF",
              textAlign: "center",
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            {new Date(this.props.data.PromisedDate || "")?.toDateString()}
          </Text>
        </View>
        <View
          style={{
            flex: 6.5,
            paddingLeft: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.key}>JobType:</Text>
            <Text style={styles.value}>{this.props.data.JobType}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.key}>Car Reg No:</Text>
            <Text style={styles.value}>{this.props.data.CarRegNumber}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.key}>Model:</Text>
            <Text style={styles.value}>{this.props.data.CarModel}</Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 15,
              right: 10,
              fontSize: 18,
              fontWeight: "bold",
              backgroundColor: this.getColorForStatus(this.props.data.Status),
            }}
          >
            <Text
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                color: "white",
              }}
            >
              {this.props.data.Status}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 150,
    borderColor: "#265E92",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    margin: 5,
    flexDirection: "row",
  },
  key: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0060AF",
    paddingTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 5,
    paddingLeft: 10,
  },
});
