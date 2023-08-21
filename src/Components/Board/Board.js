import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ColumnCard from "../ColumnCard/ColumnCard";
import TaskCard from "../TaskCard/TaskCard";
import { useBoardsContext } from "../../BoardsContext";
import { useUserContext } from "../../userContext";
import Modal from "react-modal";
import "./Board.css";

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

const Board = () => {
  console.log("Board rendered after login");
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [BoardTitle, setBoardTitle] = useState("");
  const { boardsList, setBoardsList, userLoggedIn, setUserLoggedIn, user, setUser} = useBoardsContext();
  const { boardId } = useParams();
  const {state, dispatch} = useUserContext();
  const focusRef = useRef(null);
  console.log("user logged in value:", state.userLoggedIn);

  useEffect(() => {
    // console.log(modalIsOpen);
    if (columnModalOpen) {
      focusRef.current.focus();
    } else {
      console.log("modal closed");
    }
  }, [columnModalOpen]);

  const selectedBoard = boardsList.find(
    (board) => board.id === parseInt(boardId)
  );

  if (!selectedBoard) {
    return <h1>Board not found!</h1>;
  }

  const createNewColumn = (e) => {
    e.preventDefault();
    const newColumn = {
      id: selectedBoard.columns.length + 1,
      title: BoardTitle,
      tasks: [
        {
          id: 1,
          title: "Task 1",
          priority: "low",
          description: "Edit this task to see how it looks like!",
        },
      ],
    };

    const updatedColumns = [...selectedBoard.columns, newColumn];
    const updatedBoard = { ...selectedBoard, columns: updatedColumns };

    const updatedBoardsList = boardsList.map((board) =>
      board.id === selectedBoard.id ? updatedBoard : board
    );

    setBoardsList(updatedBoardsList);
    setColumnModalOpen(false);
    setBoardTitle("");
  };


  return (
    <div className="board-container">
     
      <h2>{selectedBoard.title}</h2>
      <div className="column-container">
        {selectedBoard.columns.map((column) => (
          <div key={column.id} className="columns">
            <ColumnCard
              title={column.title}
              id={column.id}
              tasks={column.tasks}
              selectedBoard={selectedBoard}
            />
          </div>
        ))}

        <div className="add-column">
          <button
            className="add-column-button"
            ref={focusRef}
            onClick={(e) => setColumnModalOpen(true)}
          >
            Add New Column
          </button>
        </div>
      </div>
      {columnModalOpen && (
      <Modal
        isOpen={columnModalOpen}
        onRequestClose={(e) => setColumnModalOpen(false)}
        style={customStyles}
      >
        <h1>Create New Column</h1>
        <form onSubmit={createNewColumn}>
          <h2>{selectedBoard.title}</h2>
          <label htmlFor="title">Column Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={BoardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
          <button
            className="addNewColumn"
            onClick={(e) => setColumnModalOpen(false)}
          >
            Cancel
          </button>
          <button className="addNewColumn" type="submit">
            Add New Column
          </button>
        </form>
      </Modal>
      )}
    </div>
  );
};

export default Board;
