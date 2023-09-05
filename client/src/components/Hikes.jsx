import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Hikes = ({ hike }) => {
    const navigate = useNavigate();
    const { name, rating, photoURL, address, place_id, busyness, driveTimeToHike } = hike;

    const clickHandler = (e) => {
        navigate(`/hike/${place_id}`);
    };

    return (
        <HikeContainer onClick={clickHandler} >
            <Image src={photoURL} />                                           
            <TextContainer>  
                <TextTitle>{name}</TextTitle>
                <TextSection className="address">{address}</TextSection>               
                <TextSection>Visitors in the last hour: <AccentSpan>{busyness[0].data}</AccentSpan></TextSection>
                {driveTimeToHike &&
                    <TextSection>Drive time to trailhead: <AccentSpan>{driveTimeToHike}</AccentSpan></TextSection>
                }
                <TextSection>Rating: <AccentSpan>{rating}</AccentSpan></TextSection>
            </TextContainer>
        </HikeContainer>
    )
};

const HikeContainer = styled.button`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 8px;
    transition: all ease 200ms;

    &:hover {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: brightness(85%) blur(3px);
        box-shadow: inset 2px 4px 5px 1px black;
    }
`;

const TextContainer = styled.div`
    box-sizing: border-box;
    background: black;
    box-shadow: 0px 0px 15px 2px var(--text-color);
    text-align: start;
    height: fit-content;
    width: 350px;
    padding: 15px 0 30px 15px;
    border-radius: 0 0 5px 5px;
    flex: 1;
`;

const TextTitle = styled.h1`
    color: var(--primary-color);
`;

const TextSection = styled.p`
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--primary-color);
    opacity: 0.9;
    margin: 0;
    
    &.address {
        color: var(--light-accent-color);
        margin: 1rem 0;
    }
`;

const AccentSpan = styled.span`
    color: var(--light-accent-color);
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    text-shadow: none;
    margin: none;
`;

const Image = styled.img`
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 0px 15px 2px var(--text-color);
    width: 350px;
    height: 350px;
    object-fit: cover;
    z-index: 1;
`;

export default Hikes;