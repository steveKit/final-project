import styled from "styled-components";


const BusynessByHour = ({ hour, busyness, day, index }) => {
    const { time } = busyness;
    const timesArray = [];
    const hoursOfTheDay = () => {
        for (let hour = 0; hour < 24; hour++) {
            const formattedHour = hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
            timesArray.push(formattedHour);
        }
    };

    hoursOfTheDay();
    
    return (
        <>
            <BusynessBar hour={`${hour}`} className={time === index && day === "Today" ? "isCurrentTime" : ""} />
            <Time>{timesArray[index]}</Time>
        </>
        
    )
};

const BusynessBar = styled.div`
    height: ${({hour }) => (hour ? hour : 0)}px;
    width: 21px;
    background-color: var(--blue-accent-color);
    box-shadow: inset 0 0 3px 1px rgb(89, 111, 133);
    border-radius: 3px 3px 0 0;
    margin-bottom: 1px;

    &.isCurrentTime {
        background-color: var(--accent-color);
        box-shadow: inset 0 0 5px 1px rgb(179, 128, 119);
        border-radius: 3px 3px 0 0;
    }
`;

const Time = styled.p`
    font-size: 0.6rem;
    font-weight: 600;
    position: relative;
    bottom: -1rem;
    left: -1.4rem;
    width: 0;
    z-index: 10;
`;

export default BusynessByHour;