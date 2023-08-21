import React, { useState, useEffect } from "react";
import { useBoardsContext } from "../../BoardsContext";
import { useUserContext } from "../../userContext";
import { ACTION_TYPES } from "../../userReducerTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const { state, dispatch } = useUserContext();
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { boards } = useBoardsContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      const user = userCredential.user;
      console.log("User successfully registered: ", user);

      const userRef = doc(db, "Users", user.uid);
      await setDoc(userRef, {
        Name: userCredentials.name,
        Email: userCredentials.email,
        UserId: user.uid,
        boards: boards,
      });
      console.log("Document written with ID: ", userRef.id);

      dispatch({
        type: ACTION_TYPES.SET_USER_CREDENTIALS,
        payload: {
          name: userCredentials.name,
          email: userCredentials.email,
          userId: user.uid,
          userLoggedIn: false,
          boards: boards,
        },
      });

      localStorage.setItem(userCredentials.name, JSON.stringify(boards));

      navigate("/");
    } catch (error) {
      console.log(
        "some error occured in handleRegister function: ",
        error.message
      );
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={userCredentials.name}
          onChange={(e) =>
            setUserCredentials((prevState) => {
              return {
                ...prevState,
                name: e.target.value,
              };
            })
          }
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          value={userCredentials.email}
          onChange={(e) =>
            setUserCredentials((prevState) => {
              return {
                ...prevState,
                email: e.target.value,
              };
            })
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={(e) =>
            setUserCredentials((prevState) => {
              return {
                ...prevState,
                password: e.target.value,
              };
            })
          }
        />
        <button type="submit">Sign up</button>
      </form>
      <div>
        <button onClick={() => navigate("/")}>
        <span class="material-icons md-light">west</span>
          Back to Login</button>
      </div>
    </div>
  );
};

export default Register;
