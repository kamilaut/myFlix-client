import { Row, Col, Container, Button, Form } from "react-bootstrap";
import React from 'react';
import "./movie-view.scss";
import { PropTypes } from "prop-types";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();

    const requestedMovie = movies.find((movie) => movie._id === movieID);


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
};