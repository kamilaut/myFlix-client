import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie),
                    onMovieClick(movie.Description);
            }}
        >
            {movie.Title}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        Director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};