import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DayOfTheWeek from "./hikeDataComponents/DayOfTheWeek";

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
                    <Image src={activeHike.photoURL} />                 
                </ElementWrapper> 
                {activeHike.populartimes && 
                    <PopularTimesWrapper>
                        {activeHike.populartimes.map((day) => (
                            <DayOfTheWeek key={uuidv4()} day={day} busyness={activeHike.busyness[0]} />
                        ))}
                    </PopularTimesWrapper> 
                }
            <button onClick={addToFavHandler} >Add to favourites</button>         
            </HikeContainer>
    )
};

const HikeContainer = styled.div`
    display: flex;
    margin: 2rem;
`;

const ElementWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 8px;
`;

const PopularTimesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 8px;
`;

const Image = styled.img`
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 0px 15px 2px var(--text-color);
    width: 400px;
    height: 400px;
    object-fit: cover;
    z-index: 1;
`;

export default HikeById;