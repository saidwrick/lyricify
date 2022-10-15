import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Card(props) {

    const navigate = useNavigate()

    if (!props.track){
        return null
    }

    return (
        <Link className="card" to={"/track/" + props.track.artists[0].name + "/" + props.track.name + 
        "/" + props.track.id}>
            <img src={props.track.album.images[1].url}>
            </img>
            <div className="card-details">
                <h1>{props.track.name}</h1>
                <h2>{props.track.artists[0].name}</h2>
            </div>
        </Link>
    );
}

export default Card;
