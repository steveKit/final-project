import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";

const SET_LOCAL_HIKES = "SET_LOCAL_HIKES";
const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
const SET_SEARCH_RADIUS = "SET_SEARCH_RADIUS";

const SearchBar = () => {
    const { state, dispatch } = useLonerContext();
    const { searchInput, searchRadius } = state;
    
    const handleInputchange = (e) => {
        dispatch({ type: SET_LOCAL_HIKES, payload: [] });
        dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value });
    };

    const handleRadiusChange = (e) => {
        dispatch({ type: SET_SEARCH_RADIUS, payload: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/get-hikes?searchTerm=${searchInput}&radius=${searchRadius}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200 && data.data) {
                    dispatch({ type: SET_LOCAL_HIKES, payload: data.data });
                }
            })
            .catch((err) => console.error(err.message)
        );
    };

    return (
        
        <SearchBarContainer onSubmit={handleSubmit} >
            <SearchInput
                type="text"
                placeholder="Enter a location..."
                value={searchInput}
                onChange={handleInputchange}
                autoFocus
            />
            <SearchRadius value={searchRadius} onChange={handleRadiusChange}>
                <Option value="50">50 km</Option>
                <Option value="100">100 km</Option>
                <Option value="150">150 km</Option>
            </SearchRadius>           
            <Submit type="submit">Search</Submit>          
        </SearchBarContainer>
        
    )
};

const SearchBarContainer = styled.form`
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(75%) blur(5px);
    z-index: 10;
    box-sizing: border-box;
    border: 1px solid var(--secondary-color);
    border-radius: 30px;
    position: sticky;
    top: 2;
    min-width: 350px;
    width: fit-content;
    padding: 5px 25px;
    margin: 0 10px;
`;

const SearchInput = styled.input`
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--primary-color);
    opacity: 75%;
    box-sizing: border-box;
    background: none;
    min-width: 400px;
    width: max-content;
    border: none;
    outline: none;

    ::placeholder {
        color: var(--secondary-color);
    }
`;

const SearchRadius = styled.select`
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
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--light-accent-color);
    opacity: 75%;
    box-sizing: border-box;
    width: 70px;
    background: none;       
    border: none;
    transition: all 300ms ease;

    &:hover {
        cursor: pointer;
        color: var(--bold-accent-color);
    }
`;

export default SearchBar;