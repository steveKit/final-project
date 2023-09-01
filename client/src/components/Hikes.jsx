import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Hikes = ({ hike }) => {
    const navigate = useNavigate();
    const { name, rating, photoURL, address, place_id, ratingQuant } = hike;
    
    const clickHandler = (e) => {
        navigate(`/hike/${place_id}`);
    };

    return (
        <>
            <HikeContainer onClick={clickHandler} >                
                {photoURL ? (
                    <Image src={photoURL} />
                ) : (
                    <p>Loading...</p>
                )}
                <TextContainer>  
                    <TextTitle>{name}</TextTitle>                 
                    <TextSection>Rating: <AccentSpan>{rating}</AccentSpan></TextSection>
                    <TextSection>Total Ratings: <AccentSpan>{ratingQuant}</AccentSpan></TextSection>
                    <TextSection>{address}</TextSection>
                </TextContainer>
            </HikeContainer>
            
        </>
    )
};

const HikeContainer = styled.button`
    display: flex;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 1.5rem;
    border: 2px solid var(--text-color);
    border-radius: 15px;

    &:hover {
        cursor: pointer;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
`;

const TextTitle = styled.h1`
    text-align: start;
    color: var(--secondary-color);
    max-width: 300px;
`;

const TextSection = styled.p`
    font-family: var(--body-font-family);
    font-size: 1.2rem;
    color: var(--primary-color);
    opacity: 0.9;
    margin: 5px;
`;

const AccentSpan = styled.span`
    color: var(--bold-accent-color);
`;

const Image = styled.img`
    margin: 0.5rem;
    border: 1px solid var(--accent-color);
    border-radius: 15px;
    box-shadow: -3px 5px 25px 2px var(--text-color);
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

export default Hikes;