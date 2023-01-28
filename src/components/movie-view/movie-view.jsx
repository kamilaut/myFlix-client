import { Row, Col, Container, Button, Form } from "react-bootstrap";
import React from 'react';
import "./movie-view.scss";
import { PropTypes } from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();
    const requestedMovie = movies.find((movie) => movie._id === movieID);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const addFavorite = (movieID) => {
        if (!token) return;

        const url = `https://mirror-stage.herokuapp.com/users/${storedUser.Username}/movies/${movieID}`;
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(url, requestOptions)
            .then((response) => {
                console.log(response);
                alert("Added to your list of favorites!");
                return response.json();
            })
            .catch((err) => {
                alert("nope");
            });

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
                <Button
                    className="fave-btn"
                    onClick={() => addFavorite(movieID)}
                >
                    Add to Favorites
                </Button>

                <Link to="/">
                    <Button className="back-button" style={{ cursor: "pointer" }}
                    >
                        Back
                    </Button>
                </Link>
            </Form>
        );
    };
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
};