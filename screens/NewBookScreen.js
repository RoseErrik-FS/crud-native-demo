import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1"
    : "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1";

const NewBookScreen = () => {
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Create a new book in the API
  const createBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          author: values.author,
          genre: values.genre,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create a new book");
      }
      navigation.navigate("BookList");
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    createBook();
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Add New Book
        </Text>
        <TextInput
          placeholder="Title"
          value={values.title}
          onChangeText={(text) => handleInputChange("title", text)}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          }}
        />
        <TextInput
          placeholder="Author"
          value={values.author}
          onChangeText={(text) => handleInputChange("author", text)}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          }}
        />
        <TextInput
          placeholder="Genre"
          value={values.genre}
          onChangeText={(text) => handleInputChange("genre", text)}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 8,
            marginBottom: 8,
          }}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: "blue", padding: 8, borderRadius: 4 }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewBookScreen;
