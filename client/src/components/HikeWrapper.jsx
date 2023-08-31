import styled from "styled-components";

import Hikes from "./Hikes";

const HikeWrapper = ({ localHikes }) => {

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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    bottom: 10vh;
    z-index: 5;
    width: 80%;
    gap: 2rem;
`;

export default HikeWrapper;