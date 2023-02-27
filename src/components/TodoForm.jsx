import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import TodoList from "./TodoList";

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
  // How of hide from by using true false State
  const [isShow, setIsShow] = useState(false);
  const showInputHandler = () => {
    setIsShow(true);
  };
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
  //
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
    console.log(id, tasks);
  };
  //Done
  return (
    <>
      {!isShow && !isEditing && (
        <button onClick={showInputHandler}>Add Task</button>
      )}
      {isShow && (
        <form onSubmit={RecordTaskHandler}>
          <input
            type="text"
            placeholder="enter Text"
            onChange={inputHandler}
            value={enterTask}
            required
          />
          <button type="submit">Add</button>
          <button onClick={hideInputHandler}>Cancel</button>
        </form>
      )}
      {isEditing && (
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
