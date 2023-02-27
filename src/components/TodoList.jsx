import "./TodoList.css";

const TodoList = ({ tasks, onDelete, onEdit, toggleComplete }) => {
  return (
    <ul className="tasks">
      {tasks.map((todo) => (
        <li
          className={`${todo.complete ? "task completes" : "task"}`}
          key={todo.id}
        >
          <p className={`${todo.complete ? "text complete" : "text"}`}>
            {todo.task}
          </p>
          <div className="actions">
            <button onClick={() => onDelete(todo.id)}> DEL</button>
            <button onClick={() => onEdit(todo)}>Edit</button>
            <button onClick={() => toggleComplete(todo.id)}>
              Change Status
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
