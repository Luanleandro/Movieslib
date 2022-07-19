import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apikey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParamns] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParamns.get("q");
  
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const SearchWithQueryURL = `${searchURL}?${apikey}&query=${query}`;

    getSearchedMovies(SearchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para <span className="query-text">{query}</span>
      </h2>
      <div className="movie-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
