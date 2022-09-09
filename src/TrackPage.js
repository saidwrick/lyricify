import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TrackPage(props) {

    const navigate = useNavigate()
    const {artist} = useParams()
    const {id} = useParams()
    const {title} = useParams()
    const [lyrics, setLyrics] = useState(null);
    const [search, setSearch] = useState("");

    async function searchGenius (){
        try {
            let splitTitle = title.split(" - ");
            splitTitle = splitTitle[0].split("(");
            
            let res = await fetch("https://api.genius.com/search?q=" + artist + " " + splitTitle[0] + "&access_token=XK4yY2e-BJGq50reeLmBD5NUf-nSm0SCFyQD48G-L6fsc6vSCJDV53dA5JYvWF4R");
            console.log(res)
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setLyrics(resJson.response.hits[0].result.url)
            } 

            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        searchGenius()
    })

    useEffect(() => {
        if (search){
            const delayDebounceFn = setTimeout(async () => {
                navigate("/?search=" + search)
            }, 300)
        
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    if (!id){
        return null
    }
    
    return (
        <div>
            <div className="search">
                <h1>
                    <a href="/">
                        Lyricify
                    </a>
                </h1>
                <input placeholder="search a track" onChange={(e) => setSearch(e.target.value)}
                    value={search}> 
                </input>
            </div>
            <div className="track-page">
                <div className="spotify-player">
                    <iframe style={{borderRadius: "12px"}}
                        src={"https://open.spotify.com/embed/track/" + id}
                        width="360" height="360" frameBorder="0">
                    </iframe>
                </div>
                <div className="lyrics">
                    {lyrics ? 
                        <a href={lyrics} target="_blank">View Lyrics</a>                    
                    :
                        <a>Lyrics not available</a>
                    }

                </div>
            </div>
        </div>
    );
}

export default TrackPage;
