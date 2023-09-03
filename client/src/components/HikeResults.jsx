import styled from "styled-components";
import { useState } from "react";
import { useLonerContext } from "../context/LonerContext";
import Hikes from "./Hikes";

const HikeResults = () => {    
    const [activeButton, setActiveButton] = useState("busyness");
    const { state } = useLonerContext();
    const { localHikes } = state;
    const sortedHikes = [...localHikes];

    sortedHikes.sort((a, b) => {
        if (activeButton === "busyness") {
            return a.busyness - b.busyness;
        } else if (activeButton === "distance") {
            const distanceA = parseFloat(a.driveTimeToHike.split(' ')[0]);
            const distanceB = parseFloat(b.driveTimeToHike.split(' ')[0]);
            
            return distanceA - distanceB;
        } else if (activeButton === "rating") {
            return b.rating - a.rating;
        }
        return 0;
    });

    return (
        <>
            {localHikes && localHikes.length > 0 && ( 
                <Wrapper>
                    <ButtonContainer>
                        <Button
                            className={`busyness ${activeButton === "busyness" ? "active" : ""}`}
                            onClick={() => setActiveButton("busyness")}
                        >
                            Busyness
                        </Button>
                        <Button
                            className={`distance ${activeButton === "distance" ? "active" : ""}`}
                            onClick={() => setActiveButton("distance")}
                        >
                            Distance
                        </Button>
                        <Button
                            className={`rating ${activeButton === "rating" ? "active" : ""}`}
                            onClick={() => setActiveButton("rating")}
                        >
                            Rating
                        </Button>
                    </ButtonContainer>
                    
                    {sortedHikes.map(hike => (
                        <Hikes key={hike.place_id} hike={hike} />
                    ))}
                </Wrapper> 
            )}
        </>
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
    padding: 4rem;
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: -5vh;
    border: 2px solid rgba(243, 247, 244, 0.5);;
    border-radius: 25px;
`;

const Button = styled.button`
    color: var(--text-color);
    font-weight: 500;
    background: rgba(243, 247, 244, 0.7);
    backdrop-filter: brightness(40%) blur(5px);
    border-radius: 0px 25px 25px 0px;
    border-left: none;

    &.busyness {
        border-radius: 25px 0px 0px 25px;
    }

    &.distance {
        border-radius: 0px;
    }

    &.rating {
        border-radius: 0px 25px 25px 0px;
    }
    
    &.active {
        color: var(--bold-accent-color);
        background-color: var(--text-color);
    }

    &:hover {
        color: var(--primary-color);
        background: rgba(243, 247, 244, 0.5);
    }

    &:hover.active {
        color: var(--bold-accent-color);
        background-color: var(--text-color);
    }
`;

export default HikeResults;