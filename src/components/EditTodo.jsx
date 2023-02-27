import React from "react";
import "./TodoForm.css";

const EditTodo = ({ onSubmitHandler, taskToEdit, onEdit }) => {
  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2>Edit Todo </h2>
      <label htmlFor="edit">Edit : Todo</label>
      <input
        type="text"
        name="edit"
        placeholder="Edit Todo"
        value={taskToEdit.task}
        onChange={onEdit}
      />
      <div className="actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default EditTodo;
