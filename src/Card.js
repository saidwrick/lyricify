import { useNavigate} from "react-router-dom";

function Card(props) {

    if (!props.track){
        return null
    }

    return (
        <a className="card" href={"/track/" + props.track.artists[0].name + "/" + props.track.name + 
        "/" + props.track.id}>
            <img src={props.track.album.images[1].url}>
            </img>
            <div className="card-details">
                <h1>{props.track.name}</h1>
                <h2>{props.track.artists[0].name}</h2>
            </div>
        </a>
    );
}

export default Card;
