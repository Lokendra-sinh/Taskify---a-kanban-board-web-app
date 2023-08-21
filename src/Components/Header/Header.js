import React from 'react';
import { useUserContext } from '../../userContext';
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  console.log("Header rendered");

  const {state, dispatch} = useUserContext();

  const handleLogout = () => {
    dispatch({type: "SET_USER_LOGGED_OUT"});
  }
  return (
    <div className='header'>
      <h6>TASKIFY</h6>
      <div className='user-profile'>
      <FontAwesomeIcon icon={faBell} style={{color: "var(--background-color-lightblue2)",}} />
      <span>|</span>
      <p>{state.name}</p>
      <button onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightToBracket} style={{color: "var(--background-color-lightblue2)",}} />
      Log Out
      </button>
      </div>
   
    </div>
  );
};

export default Header;
