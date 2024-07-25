import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {

  })
 
  const handleClick =(e)=> {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  }
  return (
    <div className="bg-custom-image bg-cover bg-center h-screen">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="flex justify-center font-bold  text-5xl text-white">To Do List</h1>
        <div className="flex flex-col justify-center items-center">
          <form onSubmit={handleClick} className="flex flex-col">
            <input type="text"
            placeholder="Write your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}/>
            <button
            type="submit"
             className="text-black font-bold text-2xl bg-white "
            >Add</button>
          </form>
          <ul>
            {tasks.map((task, index) => (
              <li className="text-white ">{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App