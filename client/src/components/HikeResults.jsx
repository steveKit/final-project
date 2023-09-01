import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import Hikes from "./Hikes";

const HikeResults = ({ isVisible }) => {

    if (!isVisible) {
        return null;
    }

    const { state } = useLonerContext();
    const { localHikes } = state;

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
    top: 20vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    gap: 3rem;
    margin-bottom: 4rem;
`;

export default HikeResults;