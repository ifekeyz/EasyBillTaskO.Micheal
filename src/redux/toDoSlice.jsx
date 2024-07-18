import { createSlice } from '@reduxjs/toolkit';

const toDoSlice = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addToDo: (state, action) => {
      state.push(action.payload);
    },
    updateToDo: (state, action) => {
      const index = state.findIndex(toDo => toDo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteToDo: (state, action) => {
      return state.filter(toDo => toDo.id !== action.payload.id);
    },
    setToDos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToDo, updateToDo, deleteToDo, setToDos } = toDoSlice.actions;
export default toDoSlice.reducer;
