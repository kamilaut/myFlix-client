import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container, Button } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const movies = useSelector((state) => state.movies);
    const [user, setUser] = useState(storedUser ? storedUser : null);

    const dispatch = useDispatch();

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
                const moviesFromApi = data
                dispatch(setMovies(moviesFromApi));
            });

    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={10} >
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                                localStorage.setItem("user", JSON.stringify(user));
                                                localStorage.setItem("token", token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={10}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : movies.length === 0 ? (
                                    <></>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-3" key={movie._id} md={3}>
                                                <MovieCard key={movie._id} movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : movies.length === 0 ? (
                                    <></>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} user={user} token={token} setUser={setUser} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : user.length === 0 ? (
                                    <Col> No such user </Col>
                                ) : (
                                    <Col>
                                        <ProfileView user={user} movies={movies} token={token} setUser={setUser} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};