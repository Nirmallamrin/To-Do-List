import React from 'react'
import { useState, useEffect } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const App = () => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [isEditing, setIsEditing] = useState(false);
const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    } catch (error) {
      console.error("Error parsing tasks from local storage", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks])
 
  const handleClick = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (isEditing) {
        const updatedTasks = tasks.map((t, index) => 
          index === currentTaskIndex ? task : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };
  

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const handleDelete = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  }
  return (
    <div className="bg-custom-image bg-cover bg-center h-screen flex flex-col items-center ">
      <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-11/12 max-w-md mt-6">
        <h1 className="font-bold text-5xl text-gray-800 mb-8 text-center">To Do List</h1>
        <form onSubmit={handleClick} className="flex flex-col mb-8">
          <input
            type="text"
            placeholder="Add your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-4 mb-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="text-white font-bold text-2xl bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg shadow-lg transition-colors duration-300"
          >
            Add
          </button>
        </form>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <input
                type="checkbox"
                className="h-6 w-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <li className="text-gray-800 flex-grow">{task}</li>
              <button
              onClick={() =>handleEdit(index)}
              className="text-green-500 hover:text-green-700 transition-colors duration-300"             
              >
              <MdOutlineEdit className="h-6 w-6"/>
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <MdDeleteOutline className="h-6 w-6" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App