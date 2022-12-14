import AsyncStorage from "@react-native-async-storage/async-storage";
class AuthService {
  isAuthenticated = async () => {
    var token = await AsyncStorage.getItem("auth-token");
    return token?.length ? true : false;
  };

  setAuthToken = async (token) => {
    await AsyncStorage.setItem("auth-token", token);
  };
  setUserInfo = async (user) => {
    await AsyncStorage.setItem("user-info", JSON.stringify(user));
  };

  getAuthToken = async () => {
    return await AsyncStorage.getItem("auth-token");
  };

  getUserInfo = async () => {
    return JSON.parse((await AsyncStorage.getItem("user-info")) || "");
  };

  handleLogout = (history) => {
    localStorage.removeItem("auth-token");
    history.push("/");
  };
}

export const authService = new AuthService();
