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
        if (localHikes) {
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
            <HikeResults isVisible={localHikes.length > 0} />                                          
        </>
    )
};

const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 2vh 3vw;
`;

const TitleText = styled.h1`    
    font-family: var(--heading-font-family);
    font-weight: 500;
    font-size: 30vw;
    opacity: 70%;
`;

export default Homepage;