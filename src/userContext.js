import React, { useContext, createContext, useReducer} from "react";
import { userReducer, initialState } from "./userReducer";
import { ACTION_TYPES } from "./userReducerTypes";

const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <userContext.Provider value={{state, dispatch}}>
            {children}
        </userContext.Provider>
    )

}