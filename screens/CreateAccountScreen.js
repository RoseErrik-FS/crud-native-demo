// screens/CreateAccountScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import authService from "../services/authService";

const CreateAccountScreen = ({ setLoggedIn, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    setError(""); // Clear any previous error messages

    // Validate email and password
    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Call the register function from authService
      await authService.register(email, password);
      setLoggedIn(true); // Set loggedIn state to true if registration is successful
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
      <TouchableOpacity
        onPress={handleCreateAccount}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 8,
    minWidth: 200,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  createAccountButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CreateAccountScreen;
