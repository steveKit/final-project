import styled from "styled-components";


const Weather = () => {
    
    return (
        <Wrapper>
            <p>weather!</p>
        </Wrapper>
        
    )
};

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow:2px 4px 5px 1px var(--text-color);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 0 0 8px 8px;
    width: 400px;
`;

export default Weather;