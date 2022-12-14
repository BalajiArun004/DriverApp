import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { SharedService } from "../services/SharedService";
import right_arrow from "../assets/images/right_arrow.png";
import job_tile from "../assets/images/job_tile.png";
import job_count_tile from "../assets/images/job_count_tile.png";
import { authService } from "../services/AuthServices";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserInfo: {},
      jobCompletedCount: 0,
    };
  }

  async componentDidMount() {
    this.setState({
      UserInfo: await authService.getUserInfo(),
    });
  }

  navigate(screen) {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.profile_name}>
            {this.state?.UserInfo?.FirstName +
              " " +
              this.state?.UserInfo?.LastName}
          </Text>
          <Text style={styles.job_title}>Driver</Text>
        </View>
        <View style={styles.dashboard}>
          <View
            style={{
              width: "95%",
              height: "100%",
              paddingTop: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <ImageBackground
              style={{
                width: "100%",
                height: "100%",
              }}
              imageStyle={{ borderRadius: 6 }}
              source={job_count_tile}
            >
              <Text
                style={{
                  fontSize: 50,
                  color: "white",
                  textAlign: "left",
                  paddingTop: 50,
                  fontWeight: "bold",
                  paddingLeft: 16,
                }}
              >
                {this.state?.jobCompletedCount || 0}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <TouchableHighlight style={styles.recent_job_button}>
          <View style={styles.recent_job_wrapper}>
            <Text style={styles.recent_job_title}>Recently Created</Text>
            <Image
              style={{
                alignSelf: "center",
              }}
              source={right_arrow}
            ></Image>
          </View>
        </TouchableHighlight>
        <View style={styles.recent_job}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profile: {
    flex: 1,
  },
  profile_name: {
    fontSize: 26,
    paddingLeft: 30,
    paddingTop: 20,
    fontWeight: "bold",
  },
  job_title: {
    fontSize: 16,
    color: "#0060AF",
    fontWeight: "600",
    paddingLeft: 30,
  },
  dashboard: {
    flex: 1.3,
  },
  recent_job_button: {
    flex: 0.7,
    borderBottomColor: "#EBE3E3",
    borderTopColor: "#EBE3E3",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  recent_job_wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingRight: 40,
  },
  recent_job_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recent_job: {
    flex: 2.7,
  },
});
