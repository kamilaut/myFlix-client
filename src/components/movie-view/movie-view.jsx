export const MovieView = ({ movie }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.author}</span>
            </div>
            <div>
                <span>Year: </span>
                <span>{movie.year}</span>
            </div>
        </div>
    );
};