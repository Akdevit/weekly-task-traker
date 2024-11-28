import React, { useState, useEffect } from "react";
import DaySelector from "./components/DaySelector";
import TodoList from "./components/TodoList";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Retrieve todos from localStorage or set default if not available
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        };
  });
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

  const currentDay = daysOfWeek[today.getDay()];

  const [selectedDay, setSelectedDay] = useState(currentDay);

  // Save todos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (day, task) => {
    setTodos({
      ...todos,
      [day]: [...todos[day], task],
    });
  };

  const deleteTodo = (day, taskIndex) => {
    setTodos({
      ...todos,
      [day]: todos[day].filter((_, index) => index !== taskIndex),
    });
  };
 
  
  return (
    <>
      <div className="h-auto p-5">
        <div className="w-full h-auto flex lg:gap-4 gap-0">
          <DaySelector
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            todos={todos}
          />
          <TodoList
            selectedDay={selectedDay}
            todos={todos[selectedDay]}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </>
  );
};

export default App;
