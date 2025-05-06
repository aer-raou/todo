"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../utils/mockApi";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

type FormData = z.infer<typeof schema>;

export default function TodoForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (title: string) => createTodo(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data.title);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            {...register("title")}
            placeholder="Add todo..."
            className={`w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              errors.title ? "border-red-500" : ""
            }`}
            aria-invalid={errors.title ? "true" : "false"}
            disabled={mutation.isLoading}
            data-testid="todo-input"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          disabled={mutation.isLoading || isSubmitting}
          data-testid="add-todo-button"
        >
          {mutation.isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </form>
  );
}