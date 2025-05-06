import { Todo } from '../store/todosSlice';

let todos: Todo[] = [
  { id: crypto.randomUUID(), title: 'Learn Next.js', completed: false },
  { id: crypto.randomUUID(), title: 'Build a Todo App', completed: true },
  { id: crypto.randomUUID(), title: 'Implement dark mode', completed: false },
];

// Simulate network delay helper`
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(500); // simulate network delay
  return [...todos];
};

// Create a new todo
export const createTodo = async (title: string): Promise<Todo> => {
  await delay(300);
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

// Update a todo
export const updateTodoApi = async (id: string, updates: Partial<Todo>): Promise<Todo | null> => {
  await delay(300);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updates };
    return todos[todoIndex];
  }
  return null;
};

// Delete a todo
export const deleteTodoApi = async (id: string): Promise<void> => {
  await delay(300);
  todos = todos.filter((t) => t.id !== id);
};

// Delete all completed todos
export const deleteCompletedTodosApi = async (): Promise<void> => {
  await delay(500);
  todos = todos.filter((t) => !t.completed);
};

// Mark all todos as complete or incomplete
export const updateAllTodosApi = async (completed: boolean): Promise<Todo[]> => {
  await delay(500);
  todos = todos.map((todo) => ({ ...todo, completed }));
  return todos;
};

// Batch update todos
export const batchUpdateTodos = async (updates: { id: string; updates: Partial<Todo> }[]): Promise<void> => {
  await delay(500);
  updates.forEach(({ id, updates }) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      Object.assign(todo, updates);
    }
  });
};