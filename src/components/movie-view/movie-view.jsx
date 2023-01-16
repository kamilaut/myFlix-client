import "./movie-view.scss";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import React from 'react';

import { PropTypes } from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie)
    return (
        <Form className="mw-100">
            <Col md={10} >
                <div>
                    <img src={movie.ImagePath} className="mw-100" />
                </div>
                <div>
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div>
                    <span>Author: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div>
                    <span>Year: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>

                <button
                    onClick={onBackClick}
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </button>
            </Col>
        </Form>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};