// screens/HomeScreen.js
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Book List"
        onPress={() => navigation.navigate("BookList")}
      />
      <Button
        title="Go to Book"
        onPress={() => navigation.navigate("Book", { bookId: 1 })}
      />
    </View>
  );
};

export default HomeScreen;
