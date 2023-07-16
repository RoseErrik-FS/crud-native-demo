// screens/BookScreen.js
import React from "react";
import { View, Text } from "react-native";

const BookScreen = ({ route }) => {
  const { bookId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Book Screen</Text>
      <Text>Book ID: {bookId}</Text>
    </View>
  );
};

export default BookScreen;
