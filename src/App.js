import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './Search.svg';
import './MovieCard';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=3a5b27f1';

const movie1 = {
    "Title": "Spiderman",
    "Year": "2010",
    "imdbID": "tt1785572",
    "Type": "movie",
    "Poster": "N/A"
};

const App = () => {
    const [movies, setMovies] = useState();
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json(); // Need to await for response.json() to parse JSON
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for you favourite film here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value) }
                />
                <img
                    src={SearchIcon}
                    alt="image"
                    onClick={() => searchMovies(searchTerm)}
                >
                </img>
            </div>
            {
                movies?.length > 0
                    ? (<div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                    )
                    : (
                        <div className="empty">
                            <h2> No movies found</h2>
                            </div>
                    )
            }

        </div>
    );
}

export default App;