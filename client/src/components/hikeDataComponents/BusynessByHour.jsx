import styled from "styled-components";

const BusynessByHour = ({ hour }) => {

    return (
        <BusynessBar hour={`${hour}`} />
    )
};

const BusynessBar = styled.div`
    height: ${({hour }) => (hour ? hour : 0)}px;
    width: 15px;
    background-color: var(--blue-accent-color);
    border: 1px solid var(--text-color);
    border-radius: 3px 3px 0 0;
`;

export default BusynessByHour;