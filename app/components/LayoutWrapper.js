import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/Dashboard";
import { navigationRef } from "../services/RootNavigation";
import Footer from "./Footer";
import { SharedService } from "../services/SharedService";
import JobList from "../screens/JobList";
import JobForm from "../screens/JobForm";

const Stack = createNativeStackNavigator();
export default class LayoutWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: "Dashboard",
    };
  }
  getActiveRouteName = (state) => {
    const route = state.routes[state?.index || 0];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Navigator}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={async (state) => {
              if (!state) return;
              const screen = this.getActiveRouteName(state);
              this.setState({
                activeScreen: screen,
              });
            }}
          >
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#0060AF",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "600",
                  color: "white",
                },
              }}
              initialRouteName="Dashboard"
            >
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="JobList"
                component={JobList}
                options={{
                  title: "JOBS",
                }}
              />
              <Stack.Screen
                name="CreateJob"
                component={JobForm}
                options={{
                  title:
                    (SharedService.selectedUser ? "EDIT" : "CREATE") + " JOB",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <View style={styles.footer}>
          <Footer currentScreen={this.state.activeScreen} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "100%",
    height: "100%",
  },
  Navigator: {
    flex: 10,
  },
  footer: {
    backgroundColor: "white",
    flex: 1,
    height: "10%",
  },
});
