import "./TodoList.css";

const TodoList = ({ tasks, onDelete, onEdit, toggleComplete }) => {
  let statusTask = "Done";
  return (
    <ul>
      {tasks.map((todo) => (
        <li key={todo.id}>
          <p className={`${todo.complete ? "complete" : ""}`}>{todo.task}</p>
          <button onClick={() => onDelete(todo.id)}> DEL</button>
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={() => toggleComplete(todo.id)}>Change Status</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
