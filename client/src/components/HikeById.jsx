import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";
import { useParams } from "react-router-dom";

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

    return (
        <HikeContainer>
            {Object.keys(activeHike).length === 0 ? (
                <></>
            ) : (            
                <Image src={activeHike.photoURL} />                 
            )}
        </HikeContainer>
    )
};

const HikeContainer = styled.div`
    display: flex;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: brightness(50%) blur(5px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-radius: 15px;
`;

const Image = styled.img`
    border: 1px solid var(--accent-color);
    border-radius: 5px;
    box-shadow: -3px 5px 25px 2px var(--text-color);
    width: 400px;
    height: 400px;
    object-fit: cover;
`;

export default HikeById;