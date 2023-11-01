import React, { useState } from 'react';
import './App.css';
// Компонент для представления отдельной задачи
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const { id, text, completed } = task;

return (
      <div>
      <span
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(id)}
      >
        {text}
      </span>
      <button className="glow-on-hover1" onClick={() => onDelete(id)}>Удалить</button>
      <button className={`glow-on-hover ${completed ? 'completed' : ''}`} onClick={() => onEdit(id)}>Редактировать</button>
    </div>
  );
};


// Компонент для отображения списка задач
const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-container">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
}
// Компонент для добавления и редактирования задачи
const TaskForm = ({ onSubmit, taskToEdit }) => {
  const [text, setText] = useState(taskToEdit ? taskToEdit.text : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }

    onSubmit({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button class="glow-on-hover2"  type="submit">{taskToEdit ? 'Редактировать' : 'Добавить'}</button>
    </form>
  );
};

export default function App() {
  const [tasks, setTasks, completed] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskToEdit(taskToEdit);
  };

  const updateTask = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...editedTask } : task
      )
    );
    setTaskToEdit(null);
  };

  return (
    <div class="ded">
      <h1>Список задач</h1>
      <TaskForm onSubmit={taskToEdit ? updateTask : addTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}




