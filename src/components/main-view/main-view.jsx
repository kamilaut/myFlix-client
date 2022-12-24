import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";


export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "Shoplifters" },
        { id: 2, title: "Triangle of Sadness" },
        { id: 3, title: "Broker" },
        { id: 4, title: "My Night at Maud's" }
    ]);

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movieData={movie} />
            ))}
        </div>
    );
};