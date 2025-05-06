import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


export default function Home() {
  return (
    <main className="bg-white w-[70%] dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 transition-colors">
      <TodoForm />
      <TodoList />
    </main>
  );
}
