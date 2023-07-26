"use client";

type TodoProps = {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  todoDelete: (id: string) => void;
};

export default function TodoItem({
  id,
  title,
  completed,
  toggleTodo,
  todoDelete,
}: TodoProps) {
  return (
    <li
      className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
      key={id}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
          className="w-6 h-6 rounded-md cursor-pointer peer"
          id={id}
        />
        <label
          htmlFor={id}
          className="ml-2 text-lg text-gray-700 dark:text-white peer-checked:line-through peer-checked:text-gray-400"
        >
          {title}
        </label>
      </div>
      <button
        className="text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
        onClick={() => todoDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
