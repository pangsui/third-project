import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import ErrorMge from "./components/ErrorMge";
import StartSearching from "./components/StartSearching";
import MovieDetails from "./components/MovieDetails";

const KEY = "8d46b768";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched([...watched, movie]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          ` https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length === 0) {
      setError("");
      setMovies([]);
      return;
    }
    fetchData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {query.length > 0 ? (
          <Box>
            {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
            {isLoading && <Loader />}
            {!error && !isLoading && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {error && <ErrorMge message={error} />}
          </Box>
        ) : (
          <StartSearching />
        )}
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatch={handleAddWatched}
            watched={watched}
          />
        ) : (
          <WatchedBox watched={watched} />
        )}
      </Main>
    </>
  );
}
