import './App.css';
import Card from "./Card.js";
import React, { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";

function App() {

    const [token, setToken] = useState("a")
    const [results, setResults] = useState("")
    const [searchParams, setSearchParams] = useSearchParams({});
    const [search, setSearch] = useState(searchParams.get("search") ? searchParams.get("search") : "")
    const [offset, setOffset] = useState(0)
    const [headerChange, setHeaderChange] = useState(false);

    function handleSearchInput(e) {
        setSearch(e.target.value)
        setSearchParams({search: e.target.value})
    }
    async function getToken() {
        try {
            let bodyParams = {
                grant_type : "client_credentials",
                client_id: "4161727968734678b0e978b4a48ce9b1",
                client_secret: "6dcfac30e2b84cf1aa8bada34d2dfaf3"
            }
            let body = new URLSearchParams(bodyParams)

            let res = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body,
                json: true,
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setToken(resJson.access_token)
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

    async function searchSpotify() {

        try {
            let res = await fetch("https://api.spotify.com/v1/search?type=track&q=" + search +"&offset=" + offset, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                if (offset == 0){
                    setResults(resJson.tracks.items)
                }
                else {
                    setResults([...results].concat(resJson.tracks.items))
                }
            } 

            else {
                console.log(res.status);
                console.log(resJson);
                return (res.status)
            }
        } 
        catch (err) {
            console.log(err);
        }
    }
    
    function handleLoadMore() {
        setOffset(offset + 20)
        console.log(offset)
    }

    // auto search, if token expired (401 error) refresh token and try search 1 more time
    useEffect(() => {
        if (offset != 0){
            setOffset(0);
        }
        if (search){
            const delayDebounceFn = setTimeout(async () => {
                let res = await searchSpotify()
                if (res === 401){
                    getToken()
                }
            }, 300)
        
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    useEffect(() => {
        searchSpotify()
    }, [token])

    // if offset is updated, search spotify with token refresh
    useEffect(()=>{
        (async () => {
            let res = await searchSpotify()
            if (res === 401){
                getToken()
            }
        })()
    }, [offset])

    // change header colour when scrolled past

    function handleScroll () {
        const position = window.scrollY;
        console.log(position)
        if (position > 10) {
            setHeaderChange(true);
        }
        else {
            setHeaderChange(false);
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });

    return (
        <div className="App">
            <div className={headerChange ? "search scroll" : "search"}>
                <h1>
                    <a href="/">
                        Lyricify
                    </a>
                </h1>
                <input placeholder="search for a track" 
                    onChange={handleSearchInput} 
                    value={search}> 
                </input>
                
            </div>
            {results? 
            <div className="results-container">
                <div className="results">
                    {results.map((e) => <Card key={e.id} track={e}></Card>)}
                </div>
                <button onClick={handleLoadMore}>Load More Results</button>
            </div>
            :
            <div className="no-search">
                search for a track to begin :)
            </div> }
        </div>
    );
}

export default App;
