import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Shoplifters",
            image:
                "https://cdn.theatlantic.com/thumbor/eqrBtLW_OyfF6AZhu9H-jrkJaa4=/0x0:1000x563/976x549/media/img/mt/2018/11/shop/original.jpg",
            author: "Hirokazu Kore-eda",
            year: "2018"
        },
        {
            id: 2,
            title: "Triangle of Sadness",
            image:
                "https://img.zeit.de/2022/41/wir-sind-verdammt-oft-gute-menschen-bild-1/wide__1300x731",
            author: "Ruben Östlund",
            year: "2022"
        },
        {
            id: 3,
            title: "Broker",
            image:
                "https://ychef.files.bbci.co.uk/976x549/p0c9fwk1.jpg",
            author: "Hirokazu Koreeda",
            year: "2022"
        },
        {
            id: 4,
            title: "My Night at Maud's",
            image:
                "https://www.filmlinc.org/wp-content/uploads/2016/08/mynightatmauds-1-1600x900-c-default.jpg",
            author: "Éric Rohmer",
            year: "1969"
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView book={selectedMovie} />;
    }

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