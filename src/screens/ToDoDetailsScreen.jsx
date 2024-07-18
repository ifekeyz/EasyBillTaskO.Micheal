import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteToDo } from "../redux/toDoSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ToDoDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toDoId = route.params?.id;
  const toDo = useSelector((state) =>
    state.toDos.find((item) => item.id === toDoId)
  );

  const handleDelete = () => {
    dispatch(
      deleteToDo({
        id: toDoId,
      })
    );
    navigation.goBack();
  };

  if (!toDo) {
    return <Text>To-Do not found!</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="gray" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="gray" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{toDo.title}</Text>
        <Text style={styles.description}>{toDo.description}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("AddEditToDo", { id: toDoId })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  bodyContainer: {
    paddingHorizontal: Platform.OS === "ios" ? 16 : 0,
    marginTop: Platform.OS === "ios" ? 5 : 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#343a40",
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    color: "#495057",
  },
  editButton: {
    backgroundColor: "#ffc107",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ToDoDetailsScreen;
