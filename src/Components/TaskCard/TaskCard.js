import React, { useState, createContext } from "react";
import { useBoardsContext } from "../../BoardsContext";
import Modal from "react-modal";
import "./TaskCard.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 30px",
    width: "400px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#2C2C38",
    color: "#fff",
    borderRadius: "10px",
  },
};

const TaskCard = ({ id, title, priority, description, columnId, tasks, selectedBoard }) => {
console.log("taskCard rendered");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [taskPriority, setTaskPriority] = useState(priority);
  const {boardsList, setBoardsList} = useBoardsContext();

  const borderStyle = {
    borderLeftColor: taskPriority === "low" ? "green" : taskPriority === "medium" ? "yellow" : taskPriority === "high" ? "orange" : "Red",
  };
  const handleEditTaskk = (e) => {
    e.preventDefault();
    const editedTask = {
      id: id,
      title: editedTitle,
      priority: taskPriority,
      description: editedDescription,
    }

    const updatedTasks = tasks.map((task) => task.id === id ? editedTask : task);
    const updatedColumns = selectedBoard.columns.map((column) => column.id === columnId ? {...column, tasks: updatedTasks} : column);
    const updatedBoards = boardsList.map((board) => board.id === selectedBoard.id ? {...board, columns: updatedColumns} : board);
    setBoardsList(updatedBoards);
    setModalIsOpen(false);

  }

  const handleDeleteTaskCard = (e) => {
e.preventDefault();
    console.log("delete task card");
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const updatedColumn = selectedBoard.columns.map((column) => column.id === columnId ? {...column, tasks: updatedTasks} : column);
    const updatedBoardsList = boardsList.map((board) => board.id === selectedBoard.id ? {...board, columns: updatedColumn} : board);
    setBoardsList(updatedBoardsList);

  }


  return (
    <div className="task-card-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={(e) => setModalIsOpen(false)}
        style={customStyles}
      >
        <h1>Edit Task</h1>
        <form onSubmit={handleEditTaskk}>
          
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
          <button
            className="cancelEditTask"
            onClick={(e) => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button className="editTask" type="submit">
            Save Changes
          </button>
        </form>
      </Modal>

      <div style={borderStyle} className="task-card" onClick={(e) => setModalIsOpen(true)} onContextMenu={handleDeleteTaskCard} >
        <h3 className="task-card-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
