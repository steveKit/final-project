import styled, { keyframes } from "styled-components";

const LoadingAnimation = ({ loading }) => {    
    if (!loading) {
        return null;
    };

    return ( 
        <Wrapper>      
            <Ball />
            <Ball className="animationDelay1"/>
            <Ball className="animationDelay2"/>
        </Wrapper> 
    )
};

const bounce = keyframes`
    10%, 40%, 50% {
        transform: translateY(0px);
        background: rgb(243, 247, 244, 0.1)
    }
    20% {
        transform: translateY(-25px);
        background: rgb(243, 247, 244, 0.3)
    }
    45% {
        transform: translateY(2px);        
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    width: fit-content;
    position: absolute;
    bottom: 15vh;
    gap: 1.5rem;
    padding: 4rem;
`;

const Ball = styled.div`
    background: rgb(243, 247, 244, 0.1);
    backdrop-filter: brightness(85%) blur(3px);
    width: 20px;
    height: 20px;
    border: 1px solid rgb(241, 215, 166, 0.60);
    border-radius: 25px;
    animation: ${bounce} 1s infinite;
    transition: all ease-in;

    &.animationDelay1 {
        animation-delay: 100ms;
    }

    &.animationDelay2 {
        animation-delay: 200ms;
    }
`;

export default LoadingAnimation;