import React, { useState } from "react";
import { isEmpty, size } from "lodash";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  //guardar Tarea despues de editar
  const saveTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      if (!validForm()) {
        return;
      }
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTasks);
    setEditMode(false);
    setTask("");
    setId("");
  };

  //Validacion de VACIO de agregar Tareas
  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debes ingresar una Tarea");
      isValid = false;
    }
    return isValid;
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task,
    };
    setTasks([...tasks, newTask]);

    setTask("");
  };

  //ELiminar Tareas
  const deleteTask = (id) => {
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  };

  //editar Tareas
  const editTask = (theTask) => {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista De Tareas</h4>
          {size(tasks) == 0 ? (
            <li className="list-group-item">Aun no hay Tareas Programadas!</li>
          ) : (
            <ul className="list-group">
              {
                //lista dinamica
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editTask(task)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              }
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Modificar Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea....."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            
            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}

            </button>
            {
                error && <span className="text-danger mb-2">{error}</span>

            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
