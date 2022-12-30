export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie)
    return (

        <div>
            <div>
                <img src={movie.ImagePath} />
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

            <button onClick={onBackClick}>Back</button>
        </div>
    );
};