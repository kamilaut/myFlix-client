import { Row, Col, Container, Button, Form } from "react-bootstrap";
import React from 'react';
import "./movie-view.scss";
import { PropTypes } from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieID } = useParams();
    const requestedMovie = movies.find((movie) => movie._id === movieID);

    const addFavorite = (movieID) => {
        if (!token) return;

        const url = `https://mirror-stage.herokuapp.com/users/${user.Username}/movies/${movieID}`;
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(url, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((updatedUser) => {
                console.log(updatedUser);
                alert("Added to your list of favorites!");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            })
            .catch((err) => {
                alert("nope");
            });
    };

    const removeFavorite = (movieID) => {
        if (!token) return;

        const url = `https://mirror-stage.herokuapp.com/users/${user.Username}/movies/${movieID}`;
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(url, requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((updatedUser) => {
                console.log(updatedUser);
                alert("Removed from your list of favorites!");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            })
            .catch((err) => {
                alert("nope");
            });
    };


    return (
        <Form>
            <div>
                <img src={requestedMovie.ImagePath} className="mw-100" />
            </div>
            <div>
                <span>Title: </span>
                <span>{requestedMovie.Title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{requestedMovie.Director.Name}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{requestedMovie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{requestedMovie.Description}</span>
            </div>
            {user.FavoriteMovies.includes(movieID) ? (
                <Button className="btn" onClick={() => removeFavorite(movieID)} >
                    Remove from Favorites
                </Button>) : (
                <Button className="btn" onClick={() => addFavorite(movieID)} >
                    Add to Favorites
                </Button>
            )}


            <Link to="/">
                <Button className="back-button" style={{ cursor: "pointer" }}
                >
                    Back
                </Button>
            </Link>
        </Form>
    );

};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired
};