import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DayOfTheWeek from "./hikeDataComponents/DayOfTheWeek";
import Weather from "./hikeDataComponents/Weather";

const HikeById = () => {
    const [ activeHike, setActiveHike ] = useState({});
    const [ forecast, setForecast ] = useState({});
    const { hikeId } = useParams();
    const { state } = useLonerContext();
    const { localHikes } = state;

    useEffect(() => {
        const findActiveHike = localHikes.find((hike) => hike.place_id === hikeId);
        setActiveHike(findActiveHike);
    }, []); 
    
    useEffect(() => {
        if (activeHike.location) {
            const { lat, lng } = activeHike.location;

            fetch(`/api/get-weather?lat=${lat}&lng=${lng}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200 && data.data) {
                        setForecast(data.data);
                    }
            })
            .catch((err) => console.error(err.message));
        }
    }, [activeHike]);

    const addToFavHandler = () => {

    };

    return (
        <HikeContainer>
            <ElementWrapper>   
                <AddFavButton onClick={addToFavHandler} >Add to favourites</AddFavButton>         
                <Image src={activeHike.photoURL} />
                <Weather />               
            </ElementWrapper> 
            {activeHike.populartimes && 
                <PopularTimesWrapper>                     
                    {activeHike.populartimes.map((day) => (
                        <DayOfTheWeek key={uuidv4()} day={day} busyness={activeHike.busyness[0]} />
                    ))}
                </PopularTimesWrapper> 
            }                    
        </HikeContainer>
    )
};

const HikeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;;
    margin: 2rem;
    height: 100vh;
`;

const ElementWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 5px;
`;

const PopularTimesWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    margin-left: 1rem;
`;

const Image = styled.img`
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    box-shadow:2px 4px 5px 1px var(--text-color);
    border: 2px solid var(--text-color);
    width: 400px;
    height: 400px;
    object-fit: cover;
    z-index: 1;
`;

const AddFavButton = styled.button`
    box-shadow: 2px 4px 5px 1px rgb(49, 59, 71);
    border: 1px solid var(--secondary-color);
    background-color: var(--text-color);
    width: 100%;
    margin-bottom: 2rem;

    &:hover {
        color: var(--primary-color);
    }
`;

export default HikeById;