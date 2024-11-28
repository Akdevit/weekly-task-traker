import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const TodoList = ({ selectedDay, todos, addTodo, deleteTodo }) => {
    const [task, setTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState(() => {
        const saved = localStorage.getItem("completedTasks");
        return saved ? JSON.parse(saved) : [];
    });


    // Add a new task
    const handleAddTodo = () => {
        if (task.trim()) {
            addTodo(selectedDay, task);
            setTask("");
        }
    };

    // Toggle task completion
    const toggleCompletion = (taskName) => {
        const updatedTasks = completedTasks.includes(taskName)
            ? completedTasks.filter((name) => name !== taskName)
            : [...completedTasks, taskName];

        setCompletedTasks(updatedTasks);

        // Update local storage for completed tasks
        localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    };


    const today = new Date(); // Get the current date
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const currentDay = daysOfWeek[today.getDay()]; // Get the day index and map it to the day name
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Abhishek Kumar </h1>
                <span className="text-lg font-thin">{currentDay}</span>
            </div>
            <div className="lg:w-[100%] w-full lg:p-6 p-0">
                <h2 className="text-xl font-bold text-center mb-4">
                    {selectedDay}'s Tasks
                </h2>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
                        placeholder="Add New Task"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="bg-black text-white px-4 py-2 rounded-r-lg"
                    >
                        Add
                    </button>
                </div>
                <div className="space-y-2 mt-4">
                    {todos.map((todo, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-3 rounded-lg bg-[#FADFA1]`}

                        >
                            <div className="flex gap-8">
                                <input
                                    type="checkbox"
                                    className="w-[15px]"
                                    checked={completedTasks.includes(todo)}
                                    onChange={() => toggleCompletion(todo)}
                                />
                                <span
                                    className={`${completedTasks.includes(todo)
                                        ? "line-through text-gray-500"
                                        : ""
                                        }`}
                                >
                                    {todo}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(selectedDay, index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <MdDelete size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
