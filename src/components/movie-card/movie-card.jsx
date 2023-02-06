import React from 'react';
import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                    <Button>{movie.Title}</Button>
                </Link>
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
    }).isRequired
};