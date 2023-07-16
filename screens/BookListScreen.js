import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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
    <View style={{ flex: 1, padding: 16 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Book List
        </Text>
        {books.length === 0 ? (
          <Text>No books found.</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleBookPress(item._id)}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 16,
                  marginBottom: 8,
                  borderRadius: 4,
                }}
              >
                <Text>Title: {item.title}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewBook")}
        style={{
          backgroundColor: "green",
          padding: 8,
          borderRadius: 4,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Add New Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookListScreen;
