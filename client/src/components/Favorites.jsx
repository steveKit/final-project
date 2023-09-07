import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLonerContext } from "../context/LonerContext";
import Hikes from "./Hikes";

const Favorites = () => {    
    const { state } = useLonerContext();
    const { userObj, userHikes } = state;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!userObj) {
            navigate("/");
        }
    }, [])

    return ( 
        <Wrapper>
            {userObj ? (
                userHikes && userHikes.length > 0 ? (
                    userHikes.map(hike => (
                        <Hikes key={hike.place_id} hike={hike} />
                    ))
                ) : (
                    <TextWrapper>
                        <TextContent>Hello {userObj.username}! Add some favorite hikes and they'll show up here.</TextContent>
                    </TextWrapper>           
                )
            ) : (
                <></>
            )}    
        
        <ButtonWrapper>
            <Button
                className="back"
                onClick={() => navigate(-1 || '/')}
            >
                Go back
            </Button> 
        </ButtonWrapper>        
        </Wrapper>
    )
};

const Wrapper = styled.div`

    display: flex;
    flex-flow: wrap;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    gap: 3rem;
    padding: 4rem;
    margin-bottom: 2rem;
`;

const TextContent = styled.h1`
    color: var(--Text-color);

`;

const TextWrapper = styled.div`
    color: var(--secondary-color);
    box-shadow: 0px 0px 15px 1px rgb(80, 100, 123);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    width: 600px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Button = styled.button`
    box-shadow: none;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    background-color: var(--text-color);
    width: 300px;
    padding: 1rem;
    margin: 1rem 0;

    &:hover {
        color: var(--primary-color);
    }
`;

export default Favorites;