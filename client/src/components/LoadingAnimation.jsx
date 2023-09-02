import styled, { keyframes } from "styled-components";

const LoadingAnimation = ({ loading }) => {    
    if (!loading) {
        return null;
    };

    return ( 
        <Wrapper>      
            <Ball className="ball1"/>
            <Ball className="ball2"/>
            <Ball className="ball3"/>
        </Wrapper> 
    )
};

const bounce = keyframes`
    40%, 70% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-30px);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    width: fit-content;
    position: relative;
    top: 10vh;
    gap: 2rem;
    padding: 4rem;
`;

const Ball = styled.div`
    background: rgb(243, 247, 244, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    width: 20px;
    height: 20px;
    border: 1px solid rgb(241, 215, 166, 0.60);
    border-radius: 25px;
    animation: ${bounce} 1.5s infinite;
    transition: all ease-in;

    &.ball2 {
        animation-delay: 150ms;
    }

    &.ball3 {
        animation-delay: 300ms;
    }
`;

export default LoadingAnimation;