import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import BusynessByHour from "./BusynessByHour";

const DayOfTheWeek = ({ day, busyness }) => {  

    return (
        <Wrapper>
            <Title>{day.name}</Title>
            <BusynessGraph>
                {day.data.map((hour, index) => (
                    <BusynessByHour key={uuidv4()} hour={hour} busyness={busyness} day={day.name} index={index} />
                ))} 
                <TimeContainer />
            </BusynessGraph> 
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);

    padding: 1.5rem 1.5rem 4rem;
    border: 2px solid var(--text-color);
    border-radius: 5px;
    max-width: 96%;

    @media screen and (max-width: 479) {
        flex-direction: row;
    }
`;

const Title = styled.h1`
    text-shadow: 3px 3px 2px var(--text-color);
    color: var(--secondary-color);
    margin-bottom: 1rem;

    @media screen and (max-width: 725px) {
        text-align: center;
    }
`;

const BusynessGraph = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    max-width: 90vw;
    width: fit-content;
    height: 100px;
    border: 1px solid var(--text-color);
    border-radius: 5px 5px 0 0;
    gap: 2.5px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: brightness(85%) blur(3px);
    box-shadow:2px 4px 5px 1px var(--text-color);
`;

const TimeContainer = styled.div`
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: brightness(85%) blur(3px);
    box-shadow:2px 4px 5px 1px var(--text-color);
    width: 100%;
    height: 25px;
    position: absolute;
    bottom: -25px;
    border-top: 1px solid var(--text-color);
    border-radius: 0 0 5px 5px;

    @media screen and (max-width: 640) {
        z-index: 10;
    }
`;

export default DayOfTheWeek;