import styled from "styled-components";

const BusynessNow = ({ busyness }) => {
    console.log(busyness);
    return (
        <BusynessBar busyness={`${ busyness }`} />
    )
};

const BusynessBar = styled.div`
    height: ${({ busyness }) => (busyness ? busyness : 0)}px;
    width: 15px;
    background-color: var(--bold-accent-color);
    border: 1px solid var(--text-color);
    border-radius: 3px 3px 0 0;
`;

export default BusynessNow;