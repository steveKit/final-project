import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import { useEffect } from "react";

const User = () => {    
    const { state } = useLonerContext();
    const { userObj } = state;

    useEffect(() => {
        console.log(userObj);
    }, [userObj])

    return ( 
        <Wrapper>      
            <p>hello user!</p>
        </Wrapper> 
    )
};

const Wrapper = styled.div`
    position: relative;
    top: 10vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    gap: 3rem;
    padding: 4rem;
`;

export default User;