import React, { useReducer } from "react";
import { ACTION_TYPES } from "./userReducerTypes";

export const initialState = {
  name: "",
  email: "",
  userId: "",
  userLoggedIn: false,
  boards: [],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_LOGGED_IN:
      return {
        ...state,
        userLoggedIn: true,
      };
    case ACTION_TYPES.SET_USER_LOGGED_OUT:
      return {
        ...state,
        userLoggedIn: false,
      };
    case ACTION_TYPES.SET_USER_CREDENTIALS:
      return {
        ...state,
        userLoggedIn: true,
        ...action.payload,
      };
    default:
      return state;
  }
};
