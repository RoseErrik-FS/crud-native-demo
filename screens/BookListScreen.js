import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { commonStyles, bookListStyles } from "../AppStyles";
import bookService from "../services/bookService";
import authHeader from "../services/authHeader";

const BookListScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const navigation = useNavigation();

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await bookService.getAllBooks();
      setBooks(booksData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching books:", error.message);
      setError(error.message || "Unexpected Error");
      setLoading(false);
    }
  };

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  // Create a new book
  const createBook = async () => {
    try {
      setLoading(true);
      await bookService.createBook(values);
      fetchBooks(); // Refresh the books list after creating a new book
      setValues({ title: "", author: "", genre: "" }); // Clear the input fields after creating a book
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  // Render loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // Check if books is undefined before rendering the FlatList
  if (!Array.isArray(books) || books.length === 0) {
    return <Text>No books found.</Text>;
  }

  // Render book list and create book form
  return (
    <View style={bookListStyles.container}>
      <View>
        <Text style={bookListStyles.title}>Book List</Text>
        {books.length === 0 ? (
          <Text style={bookListStyles.bookTitle}>No books found.</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity // Changed from TouchableHighlight to TouchableOpacity
                onPress={() => navigation.navigate("Book", { _id: item._id })}
                style={bookListStyles.bookItem}
              >
                <Text style={bookListStyles.bookTitle}>
                  Title: {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View>
        <Text style={bookListStyles.title}>Create New Book</Text>
        <TextInput
          placeholder="Title"
          value={values.title}
          onChangeText={(text) => handleInputChange("title", text)}
          style={bookListStyles.textInput}
        />
        <TextInput
          placeholder="Author"
          value={values.author}
          onChangeText={(text) => handleInputChange("author", text)}
          style={bookListStyles.textInput}
        />
        <TextInput
          placeholder="Genre"
          value={values.genre}
          onChangeText={(text) => handleInputChange("genre", text)}
          style={bookListStyles.textInput}
        />
        <TouchableOpacity style={commonStyles.button} onPress={createBook}>
          <Text style={commonStyles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookListScreen;
