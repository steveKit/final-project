import { useRef, useEffect } from "react";
import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import SearchBar from "./SearchBar";
import HikeWrapper from "./HikeWrapper";


const Homepage = () => {
    const { state } = useLonerContext();
    const { localHikes } = state;

    return (
        <>
            <Wrapper>
                <TitleText>
                    LONER
                </TitleText>
            </Wrapper>           
            <SearchBar />                            
            <HikeWrapper
                localHikes={localHikes}
            />                
        </>
    )
};

const Wrapper = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    top: 5vh;
    left: 0;
    padding: 2vh 0 2vh 3vw;
`;

const TitleText = styled.h1`    
    font-family: var(--heading-font-family);
    font-weight: 500;
    font-size: 30vw;
    opacity: 70%;
`;

export default Homepage;