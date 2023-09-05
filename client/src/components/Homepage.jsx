import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import SearchBar from "./SearchBar";
import HikeResults from "./HikeResults";
import LoadingAnimation from "./LoadingAnimation";

const Homepage = () => {
    const [ loading, setLoading ] = useState(false);
    const { state } = useLonerContext();
    const { localHikes, userHikes } = state;
    const hikeResultsRef = useRef(null);

    useEffect(() => {
        if (localHikes.length > 0) {            
            hikeResultsRef.current.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    }, [localHikes]);

    return (
        <>
            <Wrapper>
                <TitleText>
                    LONER
                </TitleText>
                <LoadingAnimation loading={loading} />
                <SearchBar setLoading={setLoading} />
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