import React, { useState, createContext, useContext, useEffect } from "react";
import { useUserContext } from "./userContext";

const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
  const {state, dispatch} = useUserContext();
  const [boardsList, setBoardsList] = useState([]);
  
  const boards = [
    {
      id: 1,
      title: "Daily Tasks",
      columns: [
        {
          id: 1,
          title: "Column 1",
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
    },
  ];

  useEffect(() => {
    // console.log("user logged in value from boards context: ", state.userLoggedIn);
    if (state.userLoggedIn) {
      // console.log("user logged in: ", user.email);
      const storedBoards = localStorage.getItem(state.name);
      if (storedBoards) {
        setBoardsList(JSON.parse(storedBoards));
      } else {
        setBoardsList(boards);
      }
    } else {
      setBoardsList(boards);
    }
  }, [state.userLoggedIn]);

  useEffect(() => {
    console.log("boardsList changed");
    console.log("user logged in value from boards context: ", state.userLoggedIn);
    console.log("user name from boards context: ", state.name);
    console.log("users boardlists: ", boardsList);

    if (state.userLoggedIn) {
      localStorage.setItem(state.name, JSON.stringify(boardsList));
    }
  }, [boardsList]);

  const contextValues = {
    boardsList,
    setBoardsList,
    boards,
  };

  return (
    <BoardsContext.Provider value={contextValues}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoardsContext = () => {
  return useContext(BoardsContext);
};
