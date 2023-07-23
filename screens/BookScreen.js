import { commonStyles, bookScreenStyles, newBookStyles } from "../AppStyles";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import bookService from "../services/bookService";

const BookScreen = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const navigation = useNavigation();

  // Get the selected book ID from the navigation route
  const route = useRoute();
  const bookId = route.params?._id;

  // Fetch the selected book from the API
  const fetchBook = async () => {
    try {
      setLoading(true);
      const bookData = await bookService.getBook(bookId);
      setBook(bookData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching book:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  // Handle input changes in the update form
  const handleInputChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  // Handle form submission for updating the book
  const handleUpdateBook = async () => {
    try {
      setLoading(true);
      const updatedBook = {
        title: values.title || book.title,
        author: values.author || book.author,
        genre: values.genre || book.genre,
      };
      await bookService.updateBook(bookId, updatedBook);
      fetchBook(); // Refresh the book details after updating
      setUpdating(false);
    } catch (error) {
      console.log("Error updating book:", error.message);
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      await bookService.deleteBook(bookId);
      // Show a confirmation message to the user
      Alert.alert("Book Deleted", "The book has been successfully deleted.", [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to the book list after deletion
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.log("Error deleting book:", error.message);
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Check if book is undefined before rendering the book details
  if (!book) {
    return <Text>Book not found.</Text>;
  }

  // Render book details and update form

  // Render book details and update form
  return (
    <View style={bookScreenStyles.container}>
      <Text style={bookScreenStyles.title}>Book Details</Text>
      <View style={bookScreenStyles.bookInfoContainer}>
        <Text style={bookScreenStyles.bookInfoText}>Title: {book.title}</Text>
        <Text style={bookScreenStyles.bookInfoText}>Author: {book.author}</Text>
        <Text style={bookScreenStyles.bookInfoText}>Genre: {book.genre}</Text>
      </View>
      {updating ? (
        <View style={newBookStyles.textInputContainer}>
          <TextInput
            placeholder="Title"
            value={values.title || book.title}
            onChangeText={(text) => handleInputChange("title", text)}
            style={bookScreenStyles.textInput}
          />
          <TextInput
            placeholder="Author"
            value={values.author || book.author}
            onChangeText={(text) => handleInputChange("author", text)}
            style={bookScreenStyles.textInput}
          />
          <TextInput
            placeholder="Genre"
            value={values.genre || book.genre}
            onChangeText={(text) => handleInputChange("genre", text)}
            style={bookScreenStyles.textInput}
          />
          <View style={bookScreenStyles.updateSection}>
            <TouchableOpacity
              style={bookScreenStyles.updateButton}
              onPress={handleUpdateBook}
            >
              <Text style={commonStyles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={bookScreenStyles.deleteButton}
              onPress={() => setUpdating(false)}
            >
              <Text style={commonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={bookScreenStyles.updateButton}
            onPress={() => setUpdating(true)}
          >
            <Text style={commonStyles.buttonText}>Update Book</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={bookScreenStyles.deleteButton}
            onPress={() => handleDeleteBook(bookId)}
          >
            <Text style={commonStyles.buttonText}>Delete Book</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BookScreen;
