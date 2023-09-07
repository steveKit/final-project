import styled from "styled-components";

const Weather = ({ activeHike, forecast }) => {
    const { name, rating } = activeHike;
    const { current } = forecast;
    const { condition, temp_c, feelslike_c, humidity, uv, precip_mm, wind_kph, wind_dir } = current;

    return (
        <>
            <TitleContainer>
                <TitleText>{name}</TitleText>
                {current &&
                        <Image src={condition.icon} alt="Weather icon" />
                }
            </TitleContainer>  
            <TextContent className="rating" ><AccentSpan>{rating} </AccentSpan>stars</TextContent>          
            <SubtitleText>Current Weather</SubtitleText>
            <Line />
            <WeatherContainer>               
                <div>
                    <TextContent>Right now, it's <AccentSpan>{temp_c}°c</AccentSpan> feels like <AccentSpan>{feelslike_c}°c</AccentSpan></TextContent>
                    <TextContent>Expect <AccentSpan>{precip_mm} mm</AccentSpan> of rain</TextContent>
                    <TextContent><AccentSpan>{humidity}%</AccentSpan> humidity</TextContent>
                    <TextContent><AccentSpan>{wind_kph} kph</AccentSpan> wind from the <AccentSpan>{wind_dir}</AccentSpan></TextContent>
                    <TextContent>UV index of <AccentSpan>{uv}</AccentSpan></TextContent>                   
                </div>               
            </WeatherContainer>
        </>
        
    )
};

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TitleText = styled.h1`
    color: var(--secondary-color);
    font-size: 2rem;
`;

const SubtitleText = styled.h3`
    color: var(--primary-color);
    font-size: 1.5rem;
    margin: 1rem 1rem 0;
`;

const Line = styled.hr`
    width: 100%;
    margin-bottom: 2rem;
`;

const TextContent = styled.p`
    color: var(--secondary-color);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1px 0;

    &.rating {
        font-size: 1.5rem;
        position: absolute;
        top: 5.5rem;
        margin-left: 1rem;
        color: var(--bold-accent-color);
    }
`;

const AccentSpan = styled.span`
    color: var(--light-accent-color);
    font-family: var(--body-font-family);
    font-size: 1.3rem;
    text-shadow: none;
    margin: none;
`;

const WeatherContainer = styled.div`
    display: flex;
    flex-direction: row;
`;


const Image = styled.img`
    width: 100px;
    height: 100px;

`;

export default Weather;