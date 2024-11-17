import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const KEY = "8d46b768";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatch,
  watched,
}) {
  const [movie, setMovie] = useState([]);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .some((watched) => watched === selectedId);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Year: year,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
    };

    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        ` https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }

    getMovieDetails();
  }, [selectedId]);
  return (
    <div className="details">
      <header>
        <button type="button" className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={title} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                onSetRating={setUserRating}
                maxRating={10}
                size={24}
              />
              {userRating > 0 && (
                <button
                  type="button"
                  className="btn-add"
                  onClick={handleAddWatched}
                >
                  +Add to List
                </button>
              )}
            </>
          ) : (
            <p>You rated this movie already</p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
