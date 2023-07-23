import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1"
    : "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1";

const API_URL = "/auth";

const register = async (email, password) => {
  try {
    console.log("Registering user:", email, password);
    const response = await axios.post(`${API_BASE}${API_URL}`, {
      email,
      password,
    });

    if (response.status === 200) {
      // Store the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);
      return true; // Return true to indicate successful registration
    } else {
      throw new Error(
        response.data.error || "Registration failed. Please try again."
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.error === "Email is already in use") {
        throw new Error(
          "Email is already in use. Please use a different email."
        );
      } else {
        throw new Error(
          error.response.data.error || "Registration failed. Please try again."
        );
      }
    } else {
      throw new Error(
        "An error occurred during registration. Please try again."
      );
    }
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}${API_URL}/signin`, {
      email,
      password,
    });

    if (response.status === 200) {
      // Store the token in AsyncStorage
      await AsyncStorage.setItem("token", response.data.token);
      return true; // Return true to indicate successful login
    } else {
      throw new Error(
        response.data.message || "Invalid email or password. Please try again."
      );
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message ||
          "An error occurred during login. Please try again."
      );
    } else {
      throw new Error("An error occurred during login. Please try again.");
    }
  }
};

const logout = async () => {
  // Clear the token from AsyncStorage
  await AsyncStorage.removeItem("token");
};

export default { login, logout, register };
