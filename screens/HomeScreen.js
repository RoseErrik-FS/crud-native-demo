import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { commonStyles, homeStyles } from "../AppStyles";

const HomeScreen = ({ navigation }) => {
  const styles = {
    ...commonStyles.container,
    ...homeStyles.container,
  };

  const handleAddNewBook = () => {
    navigation.navigate("NewBook");
  };

  return (
    <View style={styles}>
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate("BookList")}
      >
        <Text style={commonStyles.buttonText}>Go to Book List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={commonStyles.button} onPress={handleAddNewBook}>
        <Text style={commonStyles.buttonText}>Add New Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
