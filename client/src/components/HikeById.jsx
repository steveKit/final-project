import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DayOfTheWeek from "./hikeDataComponents/DayOfTheWeek";
import Weather from "./hikeDataComponents/Weather";

const SET_USER = "SET_USER";

const HikeById = () => {
    const [ activeHike, setActiveHike ] = useState({});
    const [ forecast, setForecast ] = useState({});
    const { hikeId } = useParams();
    const { state, dispatch } = useLonerContext();
    const { localHikes, userObj } = state;

    useEffect(() => {

    }, [userObj])

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

    const onClickHandler = (e) => {
        if (userObj && e.target.innerText === "Remove from Favorites") {           
            fetch(`/api/delete-user-hike/${userObj._id}/${activeHike.place_id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        const updatedUserHikes = userObj.userHikes.filter(
                            hike => hike !== activeHike.place_id
                        );

                        const updateUserObj = {
                            ...userObj,
                            userHikes: updatedUserHikes,
                        };

                        dispatch({ type: SET_USER, payload: updateUserObj });
                    }
            })
        } else if (userObj && e.target.innerText == "Add to favorites") {
            fetch(`/api/add-user-hike/${userObj._id}/${activeHike.place_id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 201) {
                        const updateUserObj = {
                            ...userObj,
                            userHikes: [...userObj.userHikes, activeHike.place_id],
                        };
                        dispatch({ type: SET_USER, payload: updateUserObj });
                    }
            })
            .catch((err) => console.error(err.message));
        }
    };

    return (
        <HikeContainer>
            <ElementWrapper>
                {userObj ? (
                    <Button onClick={onClickHandler} >
                    {userObj.userHikes.includes(activeHike.place_id)
                        ? "Remove from Favorites"
                        : "Add to favorites"
                    }
                </Button>
                ) : (
                    <Button onClick={onClickHandler} >Login to add favorites</Button> 
                )}
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
    margin-bottom: 4rem;
`;

const PopularTimesWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    margin: 0 1rem 4rem;
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

const Button = styled.button`
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