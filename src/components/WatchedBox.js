import { useState } from "react";
import Summary from "./Summary";
import WatchedSummary from "./WatchedSummary";

export default function WatchedBox({ tempWatchedData }) {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <Summary watched={watched} />
          <ul className="list">
            {watched.map((movie) => (
              <WatchedSummary movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
