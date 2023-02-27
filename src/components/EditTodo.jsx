import React from "react";

const EditTodo = ({ onSubmitHandler, taskToEdit, onEdit }) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <h2>Edit Todo </h2>
      <label htmlFor="edit">Edit : Todo</label>
      <input
        type="text"
        name="edit"
        placeholder="Edit Todo"
        value={taskToEdit.task}
        onChange={onEdit}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTodo;
