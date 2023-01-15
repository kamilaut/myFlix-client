import React from 'react';
import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Card } from 'react-bootstrap';


export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button onClick={() => {
                    onMovieClick(movie);
                }}
                >
                    {movie.Title}

                </Button>
            </Card.Body>
        </Card>
    );
};



MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};