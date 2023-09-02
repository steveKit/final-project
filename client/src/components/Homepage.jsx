import { useEffect, useRef } from "react";
import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import SearchBar from "./SearchBar";
import HikeResults from "./HikeResults";

const Homepage = () => {
    const { state } = useLonerContext();
    const { localHikes } = state;
    const hikeResultsRef = useRef(null);

    useEffect(() => {
        if (localHikes.length === 0) {
            window.scrollTo({ behavior: "smooth", top: 0 });
        } else {
            hikeResultsRef.current.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    }, [localHikes]);

    return (
        <>
            <Wrapper>
                <TitleText>
                    LONER
                </TitleText>
                <SearchBar />
            </Wrapper>
            <div ref={hikeResultsRef} />                       
            <HikeResults />                                          
        </>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 80vh;
`;

const TitleText = styled.h1`    
    font-family: var(--heading-font-family);
    font-weight: 500;
    font-size: 30vw;
    opacity: 70%;
`;

export default Homepage;