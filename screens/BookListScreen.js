import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1"
    : process.env.REACT_APP_BASE_URL;

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const getBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
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

  const createBook = async () => {
    try {
      setLoading(true);
      await fetch(`${API_BASE}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      getBooks();
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

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
          Book List
        </Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text style={{ color: "blue" }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Create New Book
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
          onPress={createBook}
          style={{ backgroundColor: "blue", padding: 8, borderRadius: 4 }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
