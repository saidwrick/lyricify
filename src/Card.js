import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {

    const navigate = useNavigate()

    function handleClick () {
        navigate("/track/" + props.track.artists[0].name + "/" + props.track.name + 
            "/" + props.track.id)
    }

    if (!props.track){
        return null
    }

    return (
        <div className="card" onClick={handleClick}>
            <img src={props.track.album.images[1].url}>
            </img>
            <div className="card-details">
                <h1>{props.track.name}</h1>
                <h2>{props.track.artists[0].name}</h2>
            </div>
        </div>
    );
}

export default Card;
