import styled from "styled-components";

import { useLonerContext } from "../context/LonerContext";
import { useEffect, useState } from "react";

import Hikes from "./Hikes";
import LoadingAnimation from "./LoadingAnimation";

const Favorites = () => {    
    const { state } = useLonerContext();
    const [ hikeDetails, setHikeDetails ] = useState([]);
    const { userObj } = state;
    const { userHikes } = userObj;

    useEffect(() => {

        fetch(`/api/get-user-hikes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userHikes }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200 && data.data) {
                    setHikeDetails(data.data, "favs");
                }
            })
            .catch((err) => {                
                console.error(err);                
            })
    }, [userHikes])

    return ( 
        <Wrapper>      
            <p>hello {userObj.username}!</p>
        {hikeDetails ? (
            <>
            {hikeDetails.map(hike => (
                <Hikes key={hike.place_id} hike={hike.name} />
            ))}
            </>           
        ) : (
            <LoadingAnimation />
        )}
            
        </Wrapper> 
    )
};

const Wrapper = styled.div`
    position: relative;
    top: 10vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    gap: 3rem;
    padding: 4rem;
`;

export default Favorites;