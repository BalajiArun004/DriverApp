import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import dashboard from "../assets/images/dashboard.png";
import profile from "../assets/images/profile.png";
import job from "../assets/images/job.png";
import dashboard_active from "../assets/images/dashboard_active.png";
import job_active from "../assets/images/job_active.png";
import { navigationRef } from "../services/RootNavigation";
import { SharedService } from "../services/SharedService";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: this.props.currentScreen,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentScreen !== prevProps.currentScreen) {
      this.setState({ activeScreen: this.props.currentScreen });
    }
  }
  navigate(screen) {
    if (screen) {
      setTimeout(() => {
        this.setState({
          activeScreen: screen,
        });
        navigationRef.navigate(screen);
      }, 100);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.navigate("Dashboard")}>
          <Image
            source={
              this.state?.activeScreen === "Dashboard"
                ? dashboard_active
                : dashboard
            }
            style={styles.image}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.navigate("JobList");
          }}
        >
          <Image
            source={
              this.state?.activeScreen?.toLowerCase()?.includes("job")
                ? job_active
                : job
            }
            style={styles.image}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={profile} style={styles.image}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 18,
    alignItems: "center",
    borderTopColor: "#0060AF",
    borderTopWidth: 0.5,
  },
});
