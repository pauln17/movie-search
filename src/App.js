import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=53ebd54b';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = useCallback(async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }, []);

    useEffect(() => {
        searchMovies(searchTerm);
    }, [searchTerm, searchMovies]);

    return (
        <div className="app">
            <h1>MovieLand</h1>
  
            <div className="search">
                <input placeholder='Search' value={searchTerm} onChange = {(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)}/>
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )}
        </div>
    );
};

export default App;