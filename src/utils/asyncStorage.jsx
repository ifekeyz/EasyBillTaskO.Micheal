import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToDos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@toDos');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
  }
};

export const saveToDos = async (toDos) => {
  try {
    const jsonValue = JSON.stringify(toDos);
    await AsyncStorage.setItem('@toDos', jsonValue);
  } catch (e) {
    console.error(e);
  }
};
