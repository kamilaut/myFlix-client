export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.Director}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.Year}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>

            <button onClick={onBackClick}>Back</button>
        </div>
    );
};