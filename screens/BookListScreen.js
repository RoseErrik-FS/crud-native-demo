import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { commonStyles, bookListStyles } from "../AppStyles";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1"
    : "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1";

const BookListScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Fetch all books from the API
  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useFocusEffect(
    React.useCallback(() => {
      getBooks();
    }, [getBooks])
  );

  console.log("Books:", books);

  // Handle book item press
  const handleBookPress = (_id) => {
    navigation.navigate("Book", { _id });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

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
              <TouchableOpacity
                onPress={() => handleBookPress(item._id)}
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
      <TouchableOpacity
        onPress={() => navigation.navigate("NewBook")}
        style={bookListStyles.addButton}
      >
        <Text style={commonStyles.buttonText}>Add New Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookListScreen;
