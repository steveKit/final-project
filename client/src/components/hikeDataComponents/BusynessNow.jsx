import styled from "styled-components";

const BusynessNow = ({ busyness, isVisible }) => {
    if (!isVisible) {
        return null;
    };

    return (
        <BusynessBar busyness={`${ busyness }`} />
    )
};

const BusynessBar = styled.div`
    height: ${({ busyness }) => (busyness ? busyness : 0)}px;
    width: 15px;
    background-color: var(--accent-color);
    box-shadow: inset 0 0 5px 1px rgb(179, 128, 119);
    border-radius: 3px 3px 0 0;
    position: absolute;
    bottom: 0;
    z-index: 10;
`;

export default BusynessNow;