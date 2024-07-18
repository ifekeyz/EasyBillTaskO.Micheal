import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, updateToDo } from '../redux/toDoSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const AddEditToDoScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const toDoId = route.params?.id;
  const toDo = useSelector(state =>
    state.toDos.find(item => item.id === toDoId)
  );

  useEffect(() => {
    if (toDo) {
      setTitle(toDo.title);
      setDescription(toDo.description);
    }
  }, [toDo]);

  const handleSave = () => {
    if (title.trim() === '') {
      alert('Title is required');
      return;
    }

    if (toDoId) {
      dispatch(updateToDo({
        id: toDoId,
        title,
        description,
      }));
    } else {
      dispatch(addToDo({
        id: Date.now(),
        title,
        description,
      }));
    }
    navigation.goBack();
  };

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
        <Text style={styles.title}>{toDoId ? 'Edit To-Do' : 'Add To-Do'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
    color: '#495057',
  },
  textArea: {
    height: 100,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEditToDoScreen;
