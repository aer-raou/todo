import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  searchQuery: string;
  sortBy: 'title' | 'status';
}

const initialState: TodosState = {
  todos: [],
  searchQuery: '',
  sortBy: 'title',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'title' | 'status'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo, setSearchQuery, setSortBy } = todosSlice.actions;
export default todosSlice.reducer;
