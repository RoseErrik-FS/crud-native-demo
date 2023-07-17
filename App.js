import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { appStyles, headerStyles } from "./AppStyles"; // Import headerStyles

import HomeScreen from "./screens/HomeScreen";
import BookListScreen from "./screens/BookListScreen";
import BookScreen from "./screens/BookScreen";
import NewBookScreen from "./screens/NewBookScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={appStyles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={headerStyles} // Use headerStyles for screenOptions
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
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
