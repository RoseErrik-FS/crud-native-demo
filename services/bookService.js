import axios from "axios";
import getAuthHeader from "./authHeader";

const API_BASE = "https://crude-demo-site-4e1109ef72c4.herokuapp.com/api/v1";
const API_URL = "/books";

const getAllBooks = async () => {
  try {
    const authHeader = await getAuthHeader();
    const response = await axios.get(`${API_BASE}${API_URL}`, {
      headers: authHeader,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch book data");
  }
};

const getBook = async (bookId) => {
  try {
    console.log("Fetching book with ID:", bookId);
    const authHeader = await getAuthHeader();
    const response = await axios.get(`${API_BASE}${API_URL}/${bookId}`, {
      headers: authHeader,
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching book:", error.message);
    throw new Error("Failed to fetch book data");
  }
};

const createBook = async (values) => {
  try {
    const authHeader = await getAuthHeader();
    await axios.post(`${API_BASE}${API_URL}`, values, {
      headers: authHeader,
    });
  } catch (error) {
    throw new Error("Failed to create a new book");
  }
};

const deleteBook = async (bookId) => {
  try {
    const authHeader = await getAuthHeader();
    await axios.delete(`${API_BASE}${API_URL}/${bookId}`, {
      headers: authHeader,
    });
  } catch (error) {
    throw new Error("Failed to delete the book");
  }
};

const updateBook = async (bookId, updatedBook) => {
  try {
    const authHeader = await getAuthHeader();
    await axios.patch(`${API_BASE}${API_URL}/${bookId}`, updatedBook, {
      headers: authHeader,
    });
  } catch (error) {
    throw new Error("Failed to update the book");
  }
};

const bookService = {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
};

export default bookService;
