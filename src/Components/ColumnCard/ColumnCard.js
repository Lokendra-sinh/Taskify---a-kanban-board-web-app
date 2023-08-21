import React, { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import Modal from "react-modal";
import { useBoardsContext } from "../../BoardsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ColumnCard.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "61%",
    left: "76%",
    // right: "auto", // Set right to auto to allow width to control the right edge
    transform: "translate(-50%, -50%)",
    // padding: "30px 30px",
    // transition: "all 0.5s ease-in-out",
    width: "50%", // Half of the screen's width
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#2C2C38",
    color: "#fff",
    // borderRadius: "10px",
  },
};

const ColumnCard = ({ title, id, tasks, selectedBoard }) => {
  console.log("columnCard rendered");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { boardsList, setBoardsList } = useBoardsContext();

  const createNewTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      priority: "low",
      description: taskDescription,
    };

    const updatedTasks = [...tasks, newTask];
    const currentColumn = selectedBoard.columns.find(
      (column) => column.id === id
    );
    const updatedColumn = { ...currentColumn, tasks: updatedTasks };
    const updatedBoardsList = boardsList.map((board) =>
      board.id === selectedBoard.id
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.id === id ? updatedColumn : column
            ),
          }
        : board
    );

    setBoardsList(updatedBoardsList);
    setModalIsOpen(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="column-card">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={(e) => setModalIsOpen(false)}
        style={customStyles}
      >
        <h1>Create New Task</h1>
        <form onSubmit={createNewTask}>
          <h2>{selectedBoard.title}</h2>
          <h4>{title}</h4>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Untitled Task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Add a more detailed description..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
          <button
            className="addNewColumn"
            onClick={(e) => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button className="addNewTask" type="submit">
            Add New Task
          </button>
        </form>
      </Modal>
      <div className="column-header-div">
        <div className="column-header-row">
          <h3 className="column-header">{title}</h3>
          <button className="trash-btn">
            <FontAwesomeIcon
              icon={faTrash}
              className="trash-icon"
            />
          </button>
          <button onClick={(e) => setModalIsOpen(true)}>
            <FontAwesomeIcon
              icon={faPlus}
              className="plus-icon"
            />
          </button>
        </div>
      </div>

      <div className="column-body">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            priority={task.priority}
            description={task.description}
            columnId={id}
            tasks={tasks}
            selectedBoard={selectedBoard}
          />
        ))}
      </div>
    </div>
  );
};

export default ColumnCard;
