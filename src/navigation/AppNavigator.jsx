import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEditToDoScreen from '../screens/AddEditToDoScreen';
import ToDoDetailsScreen from '../screens/ToDoDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddEditToDo" 
          component={AddEditToDoScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ToDoDetails" 
          component={ToDoDetailsScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
