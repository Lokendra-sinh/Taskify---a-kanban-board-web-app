import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Board from "./Components/Board/Board";
import Header from "./Components/Header/Header";
import { useBoardsContext } from "./BoardsContext";
import { useUserContext } from "./userContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { app, db } from "./firebaseConfig";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function App() {
  const { state, dispatch } = useUserContext();
  console.log("user logged in value from app component: ", state.userLoggedIn);

  const RequireAuth = ({ children }) => {
    return state.userLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <body>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/board/*"
          element={
            <div className="main-container">
              <div>
                <Header />
              </div>
              <div className="main-content">
                <Sidebar />
                <article className="boards-section">
                  <Routes>
                    <Route
                      path=":boardId"
                      element={
                        <RequireAuth>
                          <Board />
                        </RequireAuth>
                      }
                    />
                  </Routes>
                </article>
              </div>
            </div>
          }
        />
      </Routes>
    </body>
  );
}

export default App;
