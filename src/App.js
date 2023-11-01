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
const TaskList = ({ tasks, onToggle, onDelete, onEdit, filterStatus }) => {
  // Фильтруем задачи в соответствии с текущим статусом фильтра
  const filteredTasks = filterStatus === "all" ? tasks : tasks.filter(task => (filterStatus === "completed" ? task.completed : !task.completed));

  return (
    <div>
      {filteredTasks.map((task) => (
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
};

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
      <button className="glow-on-hover2"  type="submit">{taskToEdit ? 'Редактировать' : 'Добавить'}</button>
    </form>
  );
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // По умолчанию показываем все задачи

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
    <div>
      <h1>Список задач</h1>
      <div>
        <button class="qwerty" onClick={() => setFilterStatus("all")}>Все</button>
        <button class="qwerty" onClick={() => setFilterStatus("completed")}>Завершенные</button>
        <button class="qwerty" onClick={() => setFilterStatus("uncompleted")}>Незавершенные</button>
      </div>
      <TaskForm onSubmit={taskToEdit ? updateTask : addTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} filterStatus={filterStatus} />
    </div>
  );
}





