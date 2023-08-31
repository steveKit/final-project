import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SET_LOCAL_HIKES = "SET_LOCAL_HIKES";
const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
const SET_SEARCH_RADIUS = "SET_SEARCH_RADIUS";
const SET_USER_ID = "SET_USER_ID";

const lonerReducer = (state, action) => {
    switch (action.type) {
        case SET_LOCAL_HIKES:
            return { ...state, localHikes: action.payload };
        case SET_SEARCH_INPUT:
            return { ...state, searchInput: action.payload };
        case SET_SEARCH_RADIUS:
            return { ...state, searchRadius: action.payload };
        case SET_USER_ID:
            return { ...state, userId: action.payload };
        default:
            return state;
    }
};

const initialState = {
    localHikes: [],
    searchInput: "",
    searchRadius: 50,
    userId: null,
};

const LonerContext = createContext();

export const LonerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(lonerReducer, initialState);
    const { user } = useAuth0();

    useEffect(() => {
        if (user) {
            const userIdString = user.sub.split("auth0|")[1];
            dispatch({ type: SET_USER_ID, payload: userIdString });
        } else {
            dispatch({ type: SET_USER_ID, payload: null });
        }
    }, [user]);

    return (
        <LonerContext.Provider value={{ state, dispatch }}>
            {children}
        </LonerContext.Provider>
    );
};

export const useLonerContext = () => {
    return useContext(LonerContext);
};