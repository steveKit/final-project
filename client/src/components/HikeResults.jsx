import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import Hikes from "./Hikes";

const HikeResults = ({ isVisible }) => {

    if (!isVisible) {
        return null;
    }

    const { state } = useLonerContext();
    const { localHikes } = state;
    console.log(localHikes);
    return (
        <Wrapper >
            {localHikes ? (        
                localHikes.map(hike => (
                    <Hikes key={hike.place_id} hike={hike} />
                ))        
            ) : (   
                <></>
            )}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    top: 15vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    gap: 3rem;
    padding: 4rem;
`;

export default HikeResults;