const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#1a1a1a",
  text: "#fff",
  textInput: "#000",
};

const appStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
};

const headerStyles = {
  headerStyle: {
    backgroundColor: "#222222",
  },
  headerTitleStyle: {
    color: "white",
  },
  headerTintColor: "white",
};

const commonStyles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    minWidth: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
};

const homeStyles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 500,
  },
};

const bookListStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#222222",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  bookItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#007BFF",
  },
  bookTitle: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 8,
    marginBottom: 8,
    color: colors.textInput,
    backgroundColor: "#f0f0f0", // Change the background color
    borderRadius: 8, // Add border radius
  },
};

const newBookStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  textInputContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  textInput: {
    padding: 8,
    color: "black",
  },
  placeholderText: {
    color: colors.placeholder,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
};

const bookScreenStyles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#222222",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  bookInfoContainer: {
    flex: 1,
    marginBottom: 16,
  },
  bookInfoText: {
    color: "white",
  },
  updateSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 8,
    marginBottom: 8,
    color: colors.textInput,
    backgroundColor: colors.text,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  updateButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholderText: {
    color: colors.placeholder,
  },
};

export {
  colors,
  commonStyles,
  homeStyles,
  bookListStyles,
  newBookStyles,
  bookScreenStyles,
  appStyles,
  headerStyles,
};
