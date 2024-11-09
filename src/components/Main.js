import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

export default function Main({ movies, tempWatchedData }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox tempWatchedData={tempWatchedData} />
    </main>
  );
}
