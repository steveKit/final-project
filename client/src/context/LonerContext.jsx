import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SET_LOCAL_HIKES = "SET_LOCAL_HIKES";
const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
const SET_SEARCH_RADIUS = "SET_SEARCH_RADIUS";
const SET_USER = "SET_USER";
const SET_USER_HIKES = "SET_USER_HIKES";
const SET_ERROR = "SET_ERROR";

const lonerReducer = (state, action) => {
    switch (action.type) {
        case SET_LOCAL_HIKES:
            return { ...state, localHikes: action.payload };
        case SET_SEARCH_INPUT:
            return { ...state, searchInput: action.payload };
        case SET_SEARCH_RADIUS:
            return { ...state, searchRadius: action.payload };
        case SET_USER:
            return { ...state, userObj: action.payload };
        case SET_USER_HIKES:
            return { ...state, userHikes: action.payload };
        case SET_ERROR:
            console.log(action.payload.message);
            const errorMessage = action.payload.status === 500 ? "Server error." : action.payload.message;
            const errObj = { ...action.payload, message: errorMessage };
            
            return { ...state, error: errObj };    
        default:
            return state;
    }
};

const initialState = {
    localHikes: [],
    userHikes: null,
    searchInput: "",
    searchRadius: 25,
    userObj: null,
    error: {},
};

const LonerContext = createContext();

export const LonerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(lonerReducer, initialState);
    const { userObj } = state;
    const { user } = useAuth0();

    useEffect(() => {
        if (user) {
            const userIdString = user.sub.split("auth0|")[1];

            fetch(`/api/get-user/${userIdString}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200 && data.data) {
                        dispatch({ type: SET_USER, payload: data.data });                        
                    }
                })
                .catch((err) => console.error(err)
                );
        } else {
            dispatch({ type: SET_USER, payload: null });
        };    
    }, [user]);

    useEffect(() => {  
        if (userObj && userObj.userHikes) {
            const hikeArray = userObj.userHikes;

            fetch(`/api/get-user-hikes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hikeArray }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200 && data.data) {                               
                    dispatch({ type: SET_USER_HIKES, payload: data.data });
                }
            })
            .catch((err) => {                
                console.error(err);                
            })
        } else {
            dispatch({ type: SET_USER_HIKES, payload: null });
        };
    }, [userObj]);

    return (
        <LonerContext.Provider value={{ state, dispatch }}>
            {children}
        </LonerContext.Provider>
    );
};

export const useLonerContext = () => {
    return useContext(LonerContext);
};