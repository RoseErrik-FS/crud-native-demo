// App.js
import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import BookListScreen from "./screens/BookListScreen";
import BookScreen from "./screens/BookScreen";
import NewBookScreen from "./screens/NewBookScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // Handle the logout logic here (e.g., clear user session, navigate to login screen)
    setLoggedIn(false); // Reset the login state to false
  };

  if (!loggedIn) {
    // If not logged in, show the login flow
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Login"
              // Pass the setLoggedIn function to LoginScreen
              children={(props) => (
                <LoginScreen {...props} setLoggedIn={setLoggedIn} />
              )}
            />
            <Stack.Screen
              name="CreateAccount"
              options={{ title: "Create Account" }}
            >
              {(props) => (
                <CreateAccountScreen {...props} setLoggedIn={setLoggedIn} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }

  // If logged in, show the main app flow
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogout}
                style={{ marginRight: 16 }}
              >
                <Text style={{ color: "red" }}>Logout</Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="BookList"
            component={BookListScreen}
            options={{ title: "Book List" }}
          />
          <Stack.Screen
            name="Book"
            component={BookScreen}
            options={{ title: "Book Details" }}
          />
          <Stack.Screen
            name="NewBook"
            component={NewBookScreen}
            options={{ title: "Add New Book" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
