import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { commonStyles, bookScreenStyles, newBookStyles } from "../AppStyles";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1"
    : "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1";

const BookScreen = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const route = useRoute();
  const navigation = useNavigation();
  const { _id } = route.params;

  // Fetch book data from the API
  const getBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/books/${_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      setBook(data);
      setValues({
        title: data.title,
        author: data.author,
        genre: data.genre,
      });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Book ID:", _id);
    getBook();
  }, []);

  console.log("Book ID:", _id);
  console.log("API Response:", book);
  console.log("Form Values:", values);

  // Delete book from the API
  const deleteBook = async () => {
    try {
      setLoading(true);
      await fetch(`${API_BASE}/books/${_id}`, {
        method: "DELETE",
      });
      navigation.navigate("BookList");
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  // Update book data in the API
  const updateBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/books/${_id}`, {
        method: "PATCH",
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
        throw new Error("Failed to update data");
      }
      const data = await response.json();
      setBook(data);
      navigation.goBack();
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateBook();
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
    <View style={bookScreenStyles.container}>
      <View>
        <Text style={bookScreenStyles.title}>Book Profile</Text>
        {book && (
          <View style={bookScreenStyles.bookInfoContainer}>
            <Text style={bookScreenStyles.bookInfoText}>
              Title: {book.title}
            </Text>
            <Text style={bookScreenStyles.bookInfoText}>
              Author: {book.author}
            </Text>
            <Text style={bookScreenStyles.bookInfoText}>
              Genre: {book.genre}
            </Text>
          </View>
        )}
        <View style={bookScreenStyles.updateSection}>
          <Text style={bookScreenStyles.title}>Update Book</Text>
          <View style={newBookStyles.textInputContainer}>
            <TextInput
              placeholder="Title"
              value={values.title}
              onChangeText={(text) => handleInputChange("title", text)}
              style={newBookStyles.textInput}
              placeholderTextColor={newBookStyles.placeholderText.color}
            />
          </View>
          <View style={newBookStyles.textInputContainer}>
            <TextInput
              placeholder="Author"
              value={values.author}
              onChangeText={(text) => handleInputChange("author", text)}
              style={newBookStyles.textInput}
              placeholderTextColor={newBookStyles.placeholderText.color}
            />
          </View>
          <View style={newBookStyles.textInputContainer}>
            <TextInput
              placeholder="Genre"
              value={values.genre}
              onChangeText={(text) => handleInputChange("genre", text)}
              style={newBookStyles.textInput}
              placeholderTextColor={newBookStyles.placeholderText.color}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={deleteBook}
              style={bookScreenStyles.deleteButton}
            >
              <Text style={bookScreenStyles.buttonText}>Delete Book</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={bookScreenStyles.updateButton}
            >
              <Text style={bookScreenStyles.buttonText}>Update Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookScreen;
