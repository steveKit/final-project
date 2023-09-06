import styled from "styled-components";
import { useState } from "react";

const BusynessByHour = ({ hour, busyness, day, index }) => {
    const [ isHovered, setIsHovered ] = useState(false);
    const { time } = busyness;
    const timesArray = [];
    const currentHour = time === index && day === "Today";

    const hoursOfTheDay = () => {
        for (let hour = 0; hour < 24; hour++) {
            const formattedHour = hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
            timesArray.push(formattedHour);
        }
    };

    hoursOfTheDay();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
        <>
            <BusynessBar
                hour={`${hour}`}
                className={currentHour ? "isCurrentTime" : ""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {isHovered && (
                <Tooltip>
                    {currentHour
                        ? <>{<AccentSpan>{hour}</AccentSpan>} visitors in the last hour</>
                        : <>{<AccentSpan>{hour}</AccentSpan>} visitors per hour on average</>
                    }
                </Tooltip>
            )}
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

    &:hover {
        box-shadow: inset 0 0 10px 8px rgb(69, 99, 128);
    }

    &.isCurrentTime {
        background-color: var(--accent-color);
        box-shadow: inset 0 0 5px 1px rgb(179, 128, 119);
        border-radius: 3px 3px 0 0;
    }

    &.isCurrentTime:hover {
        box-shadow: inset 0 0 10px 5px rgb(185, 92, 76);
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

    @media screen and (max-width: 630px) {
        opacity: 0;
    }
`;

const Tooltip = styled.p`
    color: var(--primary-color);
    text-shadow: 3px 3px 2px var(--text-color);
    font-size: 1.4rem;
    font-weight: 500;
    position: absolute;
    top: -2.5rem;
    right: 1rem;
`;

const AccentSpan = styled.span`
    color: var(--light-accent-color);
    font-family: var(--body-font-family);
    font-size: 1.5rem;
`;

export default BusynessByHour;