import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
	const inputRef = useRef(null);

	useEffect(() => {
		console.log(inputRef.current);
		inputRef.current.focus();
	}, []);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputRef}
		/>
	);
}
