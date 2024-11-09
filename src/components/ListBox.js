import { useState } from "react";
import MovieList from "./MovieList";

export default function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        type="button"
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}