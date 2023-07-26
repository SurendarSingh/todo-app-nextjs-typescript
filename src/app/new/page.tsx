import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Todo");
  }

  await prisma.todo.create({ data: { title, completed: false } });
  redirect("/");
}

export default function AddNewTodo() {
  return (
    <form action={createTodo} className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold tracking-loose text-gray-900 dark:text-white md:text-4xl mb-4 text-center">
        Add New Todo
      </h1>
      <input
        className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out text-center text-xl text-gray-700 dark:text-black"
        type="text"
        name="title"
        placeholder="To do"
      />
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black transition duration-300 ease-in-out text-center w-1/2 mr-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-black transition duration-300 ease-in-out text-center w-1/2 ml-2"
        >
          Add
        </button>
      </div>
    </form>
  );
}
