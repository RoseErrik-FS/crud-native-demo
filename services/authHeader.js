import AsyncStorage from "@react-native-async-storage/async-storage";

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    return { Authorization: `${token}` };
  } else {
    return {};
  }
};

export default getAuthHeader;
