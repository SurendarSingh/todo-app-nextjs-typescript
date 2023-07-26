import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodoCompleted(id: string, completed: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { completed } });
}

async function todoDelete(id: string) {
  "use server";
  await prisma.todo.delete({ where: { id } });
  const randomNumber = Math.random();
  redirect(`/?random=${randomNumber}`);
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold tracking-loose text-gray-900 dark:text-white md:text-4xl">
          Todo App
        </h1>
        <Link
          className="text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
          href="/new"
        >
          Add Task
        </Link>
      </header>

      <ul className="flex flex-col gap-4 p-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodoCompleted}
            todoDelete={todoDelete}
          />
        ))}
      </ul>
    </>
  );
}
