import "./movie-view.scss";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import React from 'react';
import { useParams } from "react-router";
// import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom';

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const movie = movie.find((b) => m._id === movieId);


    return (
        <Form>
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

            <Link to={'/'}>
                <Button
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </Button>
            </Link>
        </Form>
    );
};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         ImagePath: PropTypes.string.isRequired,
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }).isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }).isRequired,
//         Description: PropTypes.string.isRequired,
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };