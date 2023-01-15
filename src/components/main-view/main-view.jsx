import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container, Button } from "react-bootstrap";

import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);


    useEffect(() => {
        fetch("https://mirror-stage.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //data is the movies array you get from the movie_api
                //storing it in the movies state using setMovies:
                setMovies(data)
            });
    }, []);



    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://mirror-stage.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //data is the movies array you get from the movie_api
                //storing it in the movies state using setMovies:
                setMovies(data)
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <Col md={10} >
                    <LoginView onLoggedIn={(user, token) => {

                        setUser(user);
                        setToken(token);

                    }} />
                    or
                    <SignupView />
                </Col>
            </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <Row className="justify-content-md-center">
            <button
                className="btn-logout"
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
            {movies.map((movie) => (
                <MovieCard key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                        console.log(selectedMovie)
                    }}
                />
            ))}
        </Row>
    );

};

