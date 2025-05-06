"use client";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({ id, title, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="mr-2 h-4 w-4"
        />
        <span className={completed ? 'line-through text-gray-500' : ''}>{title}</span>
      </div>
      <button 
        onClick={onDelete} 
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}