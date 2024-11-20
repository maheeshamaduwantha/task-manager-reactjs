import React from "react";
import { useState } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

function Home() {
  //Task States
  const [tasks, setTasks] = useState([]);

  // User Input Tasks
  const [inputTask, setInputTask] = useState("");

  //Add new task
  const addNewTask = (title) => {
    if (title !== "") {
      //Last Id
      const lastId = tasks.length === 0 ? 0 : tasks[tasks.length - 1].id;
      const newTask = { id: lastId + 1, title: title, completed: false };
      setTasks([...tasks, newTask]);
      setInputTask("");
    }
  };

  //Remove a task
  const removeTask = (id) => {
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.id !== id);
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold py-5">Task Manager</h1>
      <p className="text-sm font-thin px-16">
        A simple and intuitive web application to manage daily tasks
        effectively. Users can create, edit, and delete tasks, assign
        priorities, and track progress with a straightforward interface. Ideal
        for individuals looking for a lightweight and efficient tool to stay
        organized and boost productivity.
      </p>
      {/* Add own task by user */}
      <section className="flex flex-col items-center justify-center mt-3">
        <input
          type="text"
          placeholder="Add New Task"
          className="border-2 border-red-700 p-2 m-2 w-60 rounded-md"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button
          onClick={() => addNewTask(inputTask)}
          className="bg-yellow-400 p-2 m-2 w-60 rounded-md"
        >
          Add New Task +
        </button>
      </section>

      {/* Show all tasks */}
      <section className="p-5 border-t-4 mt-5">
        {tasks &&
          tasks.map((task) => {
            return (
              <div
                key={task.id}
                className=" flex flex-row items-center justify-center gap-4"
              >
                <p className={
                  task.completed
                  ? "bg-green-400 p-2 m-2 rounded-md"
                  : "bg-purple-400 p-2 m-2 rounded-md"
                }>{
                  task.completed ? task.title + " (Completed!)" : task.title
                }</p>
                <div
                  onClick={() => removeTask(task.id)}
                  className="p-3 bg-red-500 rounded-md cursor-pointer text-white"
                >
                  <FiTrash2 />
                </div>
                <div
                  onClick={() => {
                    setTasks(
                      tasks.map((item) => {
                        if (item.id === task.id) {
                          return { ...item, completed: true };
                        }
                        return item;
                      })
                    );
                  }}
                  className="p-3 bg-green-500 rounded-md cursor-pointer text-white"
                >
                  <FiCheckCircle />
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Home;
