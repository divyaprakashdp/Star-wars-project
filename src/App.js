import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]); //state for movies name
  const [isLoading, setIsLoading] = useState(false); //state for loaing status
  const [error, setError] = useState(null); //state for error

  async function fetchMovieHandler() {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if(!response.ok){
        throw new Error('Oops! Something went wrong.')
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.openingCrawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <p>
            No Movies found, try clicking on Fetch Movies{" "}
            <span role="img" aria-label="arrow">
              👆
            </span>
          </p>
        )}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
