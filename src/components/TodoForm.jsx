import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import TodoList from "./TodoList";
import "./TodoForm.css";

const TodoForm = () => {
  // Use State for collect onChange input
  const [enterTask, setEnterTask] = useState("");
  // USe State for create array for collecting the input
  const [tasks, setTasks] = useState(() => {
    const saveTasks = localStorage.getItem("Tasks");
    if (saveTasks) {
      return JSON.parse(saveTasks);
    } else {
      return [];
    }
  });
  // show or hide form by using true false State
  const [isShow, setIsShow] = useState(false);
  // setIsShow = true mean render the form for add the Task
  const showInputHandler = () => {
    setIsShow(true);
  };
  // setIsShow = false mean not to render the form
  const hideInputHandler = () => {
    setIsShow(false);
  };
  //useEffect for after the rendered we must collect data save into localStorage for show later
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }, [tasks]);

  // function Handler for collect input text and updated save into enterTask state
  const inputHandler = (e) => {
    setEnterTask(e.target.value);
    // console.log(e.target.value);
  };
  //create Obj that have id status and input task for put into array
  const taskOgj = {
    id: tasks.length,
    task: enterTask.trim(),
    complete: false,
  };
  // Record Obj and save into array
  const RecordTaskHandler = (e) => {
    e.preventDefault();
    if (enterTask !== "") {
      setTasks((taskComplete) => [...taskComplete, taskOgj]);
    }
    // console.log(tasks);
    setEnterTask("");
    setIsShow(false);
  };
  //Delete task using filter
  const deleteHandler = (id) => {
    const deleteTask = tasks.filter((delTask) => {
      return delTask.id !== id;
    });
    setTasks(deleteTask);
  };
  // Editing function
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const editInputHandler = (e) => {
    setCurrentTask({ ...currentTask, task: e.target.value });
    setIsShow(false);
  };
  const editHandler = (enterTask) => {
    setIsEditing(true);
    setCurrentTask({ ...enterTask });
  };
  //map new task that user updated into old task use setTask state
  const updateHandler = (id, upDatedTask) => {
    const upDatedItem = tasks.map((task) => {
      return task.id === id ? upDatedTask : task;
    });
    setIsEditing(false);
    setTasks(upDatedItem);
  };
  function handleEditForm(e) {
    e.preventDefault();
    updateHandler(currentTask.id, currentTask);
  }
  //toggleComplete for check id that coming is equal to id  or not ( I Set it to equal) to change css class
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
    //console.log(id, tasks);
  };
  //Done
  return (
    <>
      {!isShow && !isEditing && (
        <div className="actions">
          <button onClick={showInputHandler}>Add Task</button>
        </div>
      )}
      {isShow && (
        <form className="form" onSubmit={RecordTaskHandler}>
          <input
            type="text"
            placeholder="Enter Your Task"
            onChange={inputHandler}
            value={enterTask}
            required
          />
          <div className="actions">
            <button type="submit">Add</button>
            <button onClick={hideInputHandler}>Cancel</button>
          </div>
        </form>
      )}
      {isEditing && !isShow && (
        <EditTodo
          taskToEdit={currentTask}
          onSubmitHandler={handleEditForm}
          onEdit={editInputHandler}
        />
      )}

      {tasks.length === 0 && <p>No Task Yet</p>}
      {tasks.length > 0 && (
        <TodoList
          tasks={tasks}
          onDelete={deleteHandler}
          onEdit={editHandler}
          toggleComplete={toggleComplete}
        />
      )}
    </>
  );
};

export default TodoForm;
