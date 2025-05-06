"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  deleteTodoApi,
  updateTodoApi,
  deleteCompletedTodosApi,
  updateAllTodosApi,
} from "../utils/mockApi";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortBy } from "../store/todosSlice";
import { RootState } from "../store";

export default function TodoList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { searchQuery, sortBy } = useSelector(
    (state: RootState) => state.todos,
  );

  const {
    data: todos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) =>
      updateTodoApi(id, {
        completed: !todos.find((t) => t.id === id)?.completed,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteCompletedMutation = useMutation({
    mutationFn: deleteCompletedTodosApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const markAllMutation = useMutation({
    mutationFn: (completed: boolean) => updateAllTodosApi(completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const filtered = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (sortBy === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const allCompleted = todos.length > 0 && completedCount === todos.length;

  if (isPending) return <p className="mt-4 text-center">Loading todos...</p>;
  if (isError)
    return (
      <p className="mt-4 text-center text-red-500">Failed to load todos.</p>
    );

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          aria-label="Search todos"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value as "title" | "status"))
          }
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          aria-label="Sort todos"
        >
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {todos.length > 0 && (
        <div className="flex justify-between mb-4">
          <button
            onClick={() => markAllMutation.mutate(!allCompleted)}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
            disabled={markAllMutation.isPending || todos.length === 0}
          >
            {markAllMutation.isPending
              ? "Processing..."
              : allCompleted
                ? "Mark All Incomplete"
                : "Mark All Complete"}
          </button>

          <button
            onClick={() => deleteCompletedMutation.mutate()}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
            disabled={deleteCompletedMutation.isPending || completedCount === 0}
          >
            {deleteCompletedMutation.isPending
              ? "Deleting..."
              : `Delete Completed (${completedCount})`}
          </button>
        </div>
      )}

      <div className="border rounded-md overflow-hidden dark:border-gray-700">
        {filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={() => toggleMutation.mutate(todo.id)}
            onDelete={() => deleteMutation.mutate(todo.id)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="p-4 text-center text-gray-500 dark:text-gray-400">
            {todos.length === 0
              ? "No todos yet. Add one above!"
              : "No todos match your search."}
          </p>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>{`${completedCount} of ${todos.length} tasks completed`}</p>
        </div>
      )}
    </div>
  );
}
