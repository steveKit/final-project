import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";

const SET_LOCAL_HIKES = "SET_LOCAL_HIKES";
const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
const SET_SEARCH_RADIUS = "SET_SEARCH_RADIUS";
const SET_ERROR = "SET_ERROR";

const SearchBar = ({ setLoading }) => {
    const { state, dispatch } = useLonerContext();
    const { searchInput, searchRadius, error } = state;
    const placeholderText = error.message ? error.message : "Enter a location..."
;
    const handleInputchange = (e) => {   
        window.scrollTo({ behavior: "smooth", top: 0 });    
        dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value });

        if (error && error.hasOwnProperty('message')) {
            dispatch({ type: SET_ERROR, payload: {} });
        };
                
        setTimeout(() => {
            dispatch({ type: SET_LOCAL_HIKES, payload: [] });
        }, 400);
    };

    const handleRadiusChange = (e) => {
        dispatch({ type: SET_SEARCH_RADIUS, payload: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`/api/get-hikes?searchTerm=${searchInput}&radius=${searchRadius}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200 && data.data) {
                    dispatch({ type: SET_LOCAL_HIKES, payload: data.data });
                } else {
                    dispatch({ type: SET_SEARCH_INPUT, payload: "" });
                    dispatch({ type: SET_ERROR, payload: data });
                }
            })
            .catch((err) => {                
                console.error(err);                
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        
        <SearchBarContainer onSubmit={handleSubmit} >
            <SearchInput
                type="text"
                placeholder={placeholderText}
                value={searchInput}
                onChange={handleInputchange}
                className={error.message ? 'error' : ''}
                autoFocus
            />
            <SearchRadius value={searchRadius} onChange={handleRadiusChange}>
                <Option value="25">25 km</Option>
                <Option value="50">50 km</Option>
                <Option value="75">75 km</Option>
                <Option value="100">100 km</Option>
            </SearchRadius>           
            <Submit type="submit">Search</Submit>          
        </SearchBarContainer>
        
    )
};

const SearchBarContainer = styled.form`
    box-shadow: inset 2px 4px 5px 1px rgb(27, 27, 27);
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(75%) blur(5px);
    z-index: 10;
    box-sizing: border-box;
    border: 1px solid var(--secondary-color);
    border-radius: 30px;
    min-width: 350px;
    width: fit-content;
    padding: 5px 25px;
    margin: 0 10px;
`;

const SearchInput = styled.input`
    text-shadow: 3px 3px 1px black;
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    white-space: normal;
    color: var(--primary-color);
    opacity: 75%;
    box-sizing: border-box;
    background: none;
    min-width: 300px;
    width: fit-content;
    border: none;
    outline: none;

    ::placeholder {
        color: var(--secondary-color);
    }

    &.error::placeholder {
        color: white;
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

const SearchRadius = styled.select`
    text-shadow: 3px 3px 1px black;
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--primary-color);
    box-sizing: border-box;
    border: none;
    outline: none;
    background: none;
    margin-right: 10px;
    transition: all 300ms ease;

    &:hover {
        cursor: pointer;       
    }
`;

const Option = styled.option`
    color: var(--text-color);
    background-color: var(--primary-color);
    outline: none;

    &:hover {
        background-color: var(--bold-accent-color);
    }

    &:focus {
        outline: none;
    }
`;

const Submit = styled.button`
    text-shadow: 3px 3px 1px black;
    width: 70px;
    border: none;
    box-shadow: none;

    &:hover {
        box-shadow: none;
        background: none;
    }
`;

export default SearchBar;