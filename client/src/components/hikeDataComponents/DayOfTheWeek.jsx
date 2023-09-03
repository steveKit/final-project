import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import BusynessByHour from "./BusynessByHour";
import BusynessNow from "./BusynessNow";

const DayOfTheWeek = ({ day, busyness }) => {
    console.log(day, "theweek");
    return (
        <>
            <h1>{day.name}</h1>
            <BusynessGraph>
                <BusynessNow busyness={busyness} />
                {day.data.map((hour) => (
                    <BusynessByHour key={uuidv4()} hour={hour} />
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
    gap: 3px;
`;

export default DayOfTheWeek;