import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import toDoReducer, { setToDos } from './toDoSlice';
import { getToDos, saveToDos } from '../utils/asyncStorage';

const loadToDos = createAsyncThunk('toDos/loadToDos', async (_, { dispatch }) => {
  const toDos = await getToDos();
  dispatch(setToDos(toDos));
});

const store = configureStore({
  reducer: {
    toDos: toDoReducer,
  },
});

store.dispatch(loadToDos());

store.subscribe(() => {
  saveToDos(store.getState().toDos);
});

export default store;
