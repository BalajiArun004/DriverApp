import { StyleSheet, View, ImageBackground, Text, Image } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import React, { Component } from "react";
import background from "../assets/images/login_background.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/images/logo.png";
import { navigationRef } from "../services/RootNavigation";
import { authService } from "../services/AuthServices";
import { ApiService } from "../services/ApiServices";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      errorMessage: "",
    };
  }

  handleChange(input) {
    const { name, value } = input;
    this.setState({ formValues: { ...this.state.formValues, [name]: value } });
  }
  handleLogin() {
    this.props.handleLoggedInStatus();
    setTimeout(() => {
      navigationRef.navigate("Dashboard");
    }, 100);
  }
  loginAction = () => {
    setTimeout(async () => {
      const { Email, Password } = this.state.formValues;
      if (Email === "" || Email === "") {
        this.setState({
          errorMessage: "Username / Password can't be empty",
        });
      } else {
        const response = await ApiService.makeAPICall({
          endpoint: "adminLogin",
          body: {
            Email,
            Password,
          },
        });
        if (response?.status === 200) {
          await authService.setAuthToken(response?.data.Token);
          await authService.setUserInfo(response?.data);
          console.log(
            `🚀 ~ file: Login.js:48 ~ Login ~ setTimeout ~ response?.data`,
            response?.data
          );

          if (response?.data.Role === "Driver") {
            this.handleLogin();
          } else {
            this.setState({
              errorMessage: "Invalid credentials",
            });
          }
        } else if (response?.response?.status === 401) {
          this.setState({
            errorMessage: "Invalid credentials",
          });
        } else {
          this.setState({
            errorMessage: "Something went wrong retry...",
          });
        }
      }
    }, 100);
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.image}>
          <LinearGradient
            end={{ x: 0.5, y: 1 }}
            start={{ x: 0.5, y: 0.3 }}
            style={styles.background_gradient}
            colors={["#FFFFFF", "transparent"]}
          >
            <View style={styles.logo}>
              <Image source={logo}></Image>
            </View>
          </LinearGradient>
          <View style={styles.login_wrapper}>
            <View style={styles.Login_Text_Wrapper}>
              <Text style={styles.Login_Text}>Driver Login</Text>
              <Text style={styles.Login_Sub_Text}>
                Please Login with your email
              </Text>
            </View>
            <View style={styles.input_wrapper}>
              <TextInput
                variant="outlined"
                name="Email"
                placeholder="Email"
                label="Email"
                style={styles.input}
                color="#265E92"
                value={this.state.formValues.Email}
                onChangeText={(text) =>
                  this.handleChange({ name: "Email", value: text })
                }
              />
              <TextInput
                variant="outlined"
                name="Password"
                placeholder="Password"
                label="Password"
                style={styles.input}
                value={this.state.formValues.Password}
                color="#265E92"
                onChangeText={(text) =>
                  this.handleChange({ name: "Password", value: text })
                }
              />
              <Button
                title="Login"
                onPress={() => this.loginAction()}
                color="#265E92"
                tintColor="white"
                style={styles.login_button}
              ></Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// color={["#FFFFFF", "transparent"]}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  background_gradient: {
    flex: 1,
  },
  login_wrapper: {
    flex: 1,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  Login_Sub_Text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#265E92",
    opacity: 0.5,
    paddingTop: 8,
  },
  Login_Text: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 27,
    textAlign: "left",
    color: "#265E92",
  },
  Login_Text_Wrapper: {
    paddingLeft: 18,
    paddingTop: 40,
  },
  input_wrapper: {
    paddingTop: 8,
    flex: 1,
  },
  input: {
    margin: 18,
  },
  login_button_wrapper: {
    flex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  login_button: {
    margin: 18,
    height: 50,
    textAlign: "center",
  },
});
