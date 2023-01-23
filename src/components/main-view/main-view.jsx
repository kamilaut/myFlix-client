import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container, Button } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
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

    return (
        <BrowserRouter>
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
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/signup"
                        element=
                        {
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

                </Routes>
            </Row>
        </BrowserRouter>
    );
}



//     // if (!user) {
//     //     return (
//     //         <>
//     //             <Col md={10} >
//     //                 <LoginView onLoggedIn={(user, token) => {

//     //                     setUser(user);
//     //                     setToken(token);

//     //                 }} />
//     //                 or
//     //                 <SignupView />
//     //             </Col>
//     //         </>
//     //     );
//     // }

//     // if (selectedMovie) {
//     //     return (
//     //         <Row className="justify-content-md-center">
//     //             <Col md={8}>
//     //                 <MovieView
//     //                     movie={selectedMovie}
//     //                     onBackClick={() => setSelectedMovie(null)}
//     //                 />
//     //             </Col>
//     //         </Row>
//     //     );
//     // }

//     // if (movies.length === 0) {
//     //     return <div>The list is empty!</div>;
//     // }

//     return (
//         <BrowserRouter>
//             <NavigationBar
//                 user={user}
//                 onLoggedOut={() => {
//                     setUser(null);
//                 }}
//             />

//             <Row className="justify-content-md-center">
//                 <Routes>
//                     <Route
//                         path="/"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/" />
//                                 ) : (
//                                     <Col md={5}>
//                                         <LoginView onLoggedIn={(user) => setUser(user)} />
//                                     </Col>
//                                 )}
//                             </>
//                         }
//                     />

//                     <Route
//                         path="/signup"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/" />
//                                 ) : (
//                                     <Col md={10}>
//                                         <SignupView />
//                                     </Col>
//                                 )}
//                             </>

//                         }
//                     />
//                     <Route
//                         path="/login"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/" />
//                                 ) : (
//                                     <Col md={10}>
//                                         <LoginView />
//                                     </Col>
//                                 )}
//                             </>

//                         }
//                     />
//                     <Route
//                         path="/movies"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/movies" />
//                                 ) : (
//                                     <Col md={10}>
//                                         <MovieView />
//                                     </Col>
//                                 )}
//                             </>

//                         }
//                     />
//                     <Route
//                         path="/"
//                         element={
//                             <>
//                                 {!user ? (
//                                     <Navigate to="/login" replace />
//                                 ) : movies.length === 0 ? (
//                                     <Col>The list is empty!</Col>
//                                 ) : (
//                                     <>
//                                         {movies.map((movie) => (
//                                             <Col className="mb-3" key={movie._id} md={3}>
//                                                 <MovieCard key={movie._id}
//                                                 />
//                                             </Col>
//                                         ))}
//                                     </>
//                                 )}
//                             </>
//                         }
//                     />
//                 </Routes>

//                 {/* {movies.map((movie) => (
//                     <Col className="mb-3" key={movie._id} md={3}>
//                         <MovieCard key={movie._id}
//                             movie={movie}
//                             onMovieClick={(newSelectedMovie) => {
//                                 setSelectedMovie(newSelectedMovie);
//                                 console.log(selectedMovie)
//                             }}
//                         />
//                     </Col>
//                 ))}
//                 <Button
//                     className="btn-logout"
//                     onClick={() => {
//                         setUser(null);
//                         setToken(null);
//                         localStorage.clear();
//                     }}
//                 >
//                     Logout
//                 </Button> */}
//             </Row>
//         </BrowserRouter>

//     );

// };
