import React from 'react';
import { SafeAreaView, View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const toDos = useSelector(state => state.toDos);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.bodyContainer}>
      <Text style={styles.title}>To-Do List</Text>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditToDo')}
      >
        <Text style={styles.addButtonText}>Add New To-Do</Text>
      </TouchableOpacity>
      <FlatList
        data={toDos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ToDoDetails', { id: item.id })}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No to-dos available</Text>}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  bodyContainer:{
      paddingHorizontal: Platform.OS == "ios" ? 16 : 0,
      marginTop:Platform.OS == "ios" ? 5 : 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    color: '#495057',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#adb5bd',
  },
});

export default HomeScreen;
