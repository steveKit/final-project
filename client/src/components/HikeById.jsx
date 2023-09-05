import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLonerContext } from "../context/LonerContext";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DayOfTheWeek from "./hikeDataComponents/DayOfTheWeek";
import Weather from "./hikeDataComponents/Weather";
import LoadingAnimation from "./LoadingAnimation";
import Reviews from "./hikeDataComponents/Reviews";

const SET_USER = "SET_USER";

const HikeById = () => {
    const [ activeHike, setActiveHike ] = useState({});
    const [ forecast, setForecast ] = useState({});
    const { hikeId } = useParams();
    const { state, dispatch } = useLonerContext();
    const { localHikes, userObj, userHikes } = state;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (userHikes && userHikes.some(hike => hike.place_id === hikeId)) {
            const findActiveHike = userHikes.find((hike) => hike.place_id === hikeId);
            setActiveHike(findActiveHike);
        } else {
            const findActiveHike = localHikes.find((hike) => hike.place_id === hikeId);
            setActiveHike(findActiveHike);
        }
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
        if (userObj && e.target.classList.contains("remove")) {           
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
        } else if (userObj && e.target.classList.contains("add")) {
            fetch(`/api/add-user-hike/${userObj._id}/${activeHike.place_id}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 201) {

                        const updateUserObj = userObj.userHikes
                            ? {
                                ...userObj,
                                userHikes: [...userObj.userHikes, activeHike.place_id],
                            } : {
                                ...userObj,
                                userHikes: [activeHike.place_id],
                            };

                        dispatch({ type: SET_USER, payload: updateUserObj });
                    }
            })
            .catch((err) => console.error(err.message));
        }
    };

    console.log(userHikes);

    return (
        <HikeContainer>
            <ElementWrapper>
                {userObj
                    ? (
                        userHikes && userObj.userHikes.includes(activeHike.place_id)
                            ? (
                                <Button 
                                    onClick={onClickHandler}
                                    className="remove"
                                >
                                Remove from favorites
                                </Button>
                            ) : (
                                <Button 
                                    onClick={onClickHandler}
                                    className="add"
                                >
                                Add to favorites
                                </Button>
                            )
                    ) : (
                        <Button className="notActive" >Login to add to favorites</Button> 
                )}   
                <Image src={activeHike.photoURL} />                                   
                <ReviewWrapper>
                    {forecast.current
                        ? (
                            <Weather activeHike={activeHike} forecast={forecast} />
                        ) : (
                            <LoadingAnimation />
                    )}
                    <SubtitleText>Reviews</SubtitleText>
                    <Line />
                    {activeHike.reviews && 
                        activeHike.reviews.map((review) => (
                            <Reviews key={uuidv4()} review={review} />
                        ))
                    }
                </ReviewWrapper>                                                     
            </ElementWrapper> 
            {activeHike.populartimes && 
                <PopularTimesWrapper>                     
                    {activeHike.populartimes.map((day) => (
                        <DayOfTheWeek key={uuidv4()} day={day} busyness={activeHike.busyness[0]} />
                    ))}
                    <Button
                        className="back"
                        onClick={() => navigate(-1)}
                    >
                        Go back
                    </Button>
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
    flex-flow: column;
    gap: 1rem;
    margin: 0 1rem 4rem;
`;

const Image = styled.img`
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 0px 15px 2px var(--text-color);
    border: 2px solid var(--text-color);
    border-bottom: none;
    width: 600px;
    height: 600px;
    object-fit: cover;
    z-index: 1;

    @media screen and (max-width: 550) {
        width: 400px;
        height: 400px;
    }
`;

const Button = styled.button`
    box-shadow: 2px 4px 5px 1px rgb(49, 59, 71);
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    background-color: var(--text-color);
    width: 600px;
    padding: 1rem;
    margin: 0 0 1rem 0;

    &:hover {
        color: var(--primary-color);
    }

    &.notActive:hover {
        box-shadow: 2px 4px 5px 1px rgb(49, 59, 71);
        background-color: var(--text-color);
        color: var(--light-accent-color);
        text-shadow: none;
        cursor: default;
    }

    &.back {
        width: 100%;
        box-shadow: none;

    }
`;

const SubtitleText = styled.h3`
    color: var(--primary-color);
    font-size: 1.5rem;
    margin: 3rem 1rem 0;
`;

const Line = styled.hr`
    width: 100%;
    margin-bottom: 2rem;
`;

const ReviewWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 15px 2px var(--text-color);
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: brightness(85%) blur(3px);
    padding: 2rem;
    border: 2px solid var(--text-color);
    border-top: none;
    border-radius: 0 0 5px 5px;
    width: 600px;
`;

export default HikeById;