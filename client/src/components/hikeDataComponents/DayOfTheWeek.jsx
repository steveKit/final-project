import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import BusynessByHour from "./BusynessByHour";

const DayOfTheWeek = ({ day, busyness }) => {   

    return (
        <>
            <h1>{day.name}</h1>
            <BusynessGraph>
                {day.data.map((hour, index) => (
                    <BusynessByHour key={uuidv4()} hour={hour} busyness={busyness} day={day.name} index={index} />
                ))} 
            </BusynessGraph> 
        </>
    )
};

const BusynessGraph = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: fit-content;
    height: 100px;
    border: 1px solid var(--text-color);
    border-radius: 5px;
    gap: 3px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: brightness(85%) blur(3px);
    box-shadow: inset 0 0 15px 1px rgb(202, 231, 240);
`;

export default DayOfTheWeek;