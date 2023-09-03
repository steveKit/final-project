import styled from "styled-components";
import BusynessNow from "./BusynessNow";

const BusynessByHour = ({ hour, busyness, day, index }) => {
    const { time, data } = busyness;
    // const currentTime = new Date();
    
    if (time === index) {
        console.log(index);
    };
    
    return (
        <Wrapper>
            <BusynessNow
                busyness={data}
                isVisible={time === index && day === "Today" ? true : false}
            />
            <BusynessBar hour={`${hour}`} />
        </Wrapper>
        
    )
};

const Wrapper = styled.div`
    
`;

const BusynessBar = styled.div`
    height: ${({hour }) => (hour ? hour : 0)}px;
    width: 15px;
    background-color: var(--blue-accent-color);
    box-shadow: inset 0 0 3px 1px rgb(89, 111, 133);
    border-radius: 3px 3px 0 0;
`;

export default BusynessByHour;