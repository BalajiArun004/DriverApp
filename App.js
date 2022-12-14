import { SafeAreaView, StyleSheet, View } from "react-native";
import Login from "./app/screens/Login";
import LayoutWrapper from "./app/components/LayoutWrapper";
import { useState, useEffect } from "react";
import { authService } from "./app/services/AuthServices";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function handleLoggedInStatus() {
    setIsLoggedIn(!isLoggedIn);
  }
  useEffect(() => {
    async function loginCheck() {
      isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        setIsLoggedIn(true);
      }
    }
    loginCheck();
  }, []);

  return (
    <View>
      <SafeAreaView></SafeAreaView>
      {isLoggedIn ? (
        <LayoutWrapper></LayoutWrapper>
      ) : (
        <Login handleLoggedInStatus={handleLoggedInStatus} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
