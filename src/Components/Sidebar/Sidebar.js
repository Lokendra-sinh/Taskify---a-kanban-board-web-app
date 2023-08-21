import React, { useState, useRef, useEffect } from "react";
import { useBoardsContext } from "../../BoardsContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faDiceFour,
  faCircle,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
    backdropFilter: "blur(3px)", // Apply a blur effect to the overlay
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "10px 10px",
    width: "350px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "var(--background-color)",
    color: "white",
    border: "none",
    borderRadius: "5px",
    // border: "0.3px solid #343a40",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
};

const Sidebar = () => {
  console.log("Sidebar rendered");
  const { boardsList, setBoardsList } = useBoardsContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contextModalIsOpen, setContextModalIsOpen] = useState(false); // [TODO
  const [BoardTitle, setBoardTitle] = useState();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [contextBoardTitle, setContextBoardTitle] = useState("");
  const focusRef = useRef(null);
  const contextRef = useRef(null);
  const navigate = useNavigate();

  console.log("boardsList:", boardsList);

  const contextModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
      backdropFilter: "blur(0.2px)", // Apply a blur effect to the overlay
    },
    content: {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      padding: "10px 10px",
      width: "150px",
      height: "120px",
      display: "flex",
      flexDirection: "column",
      // gap: "10px",
      justifyContent: "space-between",
      // alignItems: "center",
      backgroundColor: "var(--background-color)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      // border: "0.3px solid #343a40",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
  };

  const createNewBoard = (e) => {
    e.preventDefault();

    const newBoard = {
      id: boardsList.length + 1,
      title: BoardTitle,
      columns: [
        {
          id: 1,
          title: "To Do",
          tasks: [
            {
              id: 1,
              title: "Task 1",
              priority: "low",
              description: "Description 1",
            },
          ],
        },
      ],
    };

    setBoardsList((prevboardsList) => [...prevboardsList, newBoard]);
    setModalIsOpen(false);
    setBoardTitle("");
    focusRef.current.focus();
  };

  const handleBoardDelete = (id) => {
    const newBoardsList = boardsList.filter((board) => board.id !== id);
    setBoardsList(newBoardsList);
    setContextModalIsOpen(false);

    if (newBoardsList.length === 0) {
      navigate("/board");
    } else {
      navigate(`/board/${id - 1}`);
    }
  };

  const handleBoardEdit = (id) => {};

  useEffect(() => {
    if (modalIsOpen) {
      focusRef.current.focus();
    } else {
      focusRef.current.blur();
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (contextModalIsOpen) {
      contextRef.current.focus();
  } else {
      contextRef.current.blur();
    }
  }, [contextModalIsOpen]);

  const handleBoardContextMenu = (e, title) => {
    e.preventDefault();

    const screenX = e.clientX;
    const screenY = e.clientY;

    setX(screenX);
    setY(screenY);
    setContextBoardTitle(title);
    contextRef.current.focus();
    setContextModalIsOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h3>BOARDS</h3>
        {boardsList &&
          boardsList.map((board) => (
            <div key={board.id} className="board-list">
              <FontAwesomeIcon
                icon={faCircle}
                style={{
                  color: "var(--background-color-darkblue)",
                  fontSize: "0.5rem",
                }}
              />
              <Link to={`/board/${board.id}`}>
                <p>{board.title}</p>
              </Link>
              <button
                ref={contextRef}
                className="boardContextBtn"
                onClick={(e) => handleBoardContextMenu(e, board.title)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
              {contextModalIsOpen && (
                <Modal
                  isOpen={contextModalIsOpen}
                  onRequestClose={(e) => setContextModalIsOpen(false)}
                  style={contextModalStyle}
                >
                  <div className="contextModalContent">
                    <p>{contextBoardTitle}</p>
                    <button onClick={(e) => handleBoardEdit(board.id)}>
                      Edit
                    </button>
                    <button onClick={(e) => handleBoardDelete(board.id)}>
                      Delete
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          ))}

        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={(e) => setModalIsOpen(false)}
            style={customStyles}
          >
            <form onSubmit={createNewBoard}>
              <h1>Create New Board</h1>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Board Title"
                value={BoardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
              <div className="action-btn">
                <button onClick={(e) => setModalIsOpen(false)}>Cancel</button>
                <button type="submit">Add New Board</button>
              </div>
            </form>
          </Modal>
        )}

        <button
          className="createBoardBtn"
          ref={focusRef}
          onClick={(e) => setModalIsOpen(true)}
        >
          Create Board
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
