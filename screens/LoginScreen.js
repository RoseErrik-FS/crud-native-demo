import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import authService from "../services/authService"; // Import the authService

const LoginScreen = ({ setLoggedIn, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Clear any previous error messages

    // Validate email and password
    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Call the login method from the authService
      const loggedIn = await authService.login(email, password);
      if (loggedIn) {
        setLoggedIn(true); // Set loggedIn state to true if login is successful
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred during login. Please try again."
      );
    }
  };

  const handleCreateAccount = () => {
    // Navigate to the CreateAccount screen
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    minWidth: 200,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  createAccountButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});

export default LoginScreen;
