import { OMDB_API_KEY } from "./credentials";
import { getSomeData } from "./network";

const hasAPoster = (movie) => movie.Poster !== "N/A";

const hasAnError = (result) => result.Response === "False";

const generateResponseCode = (result) => {
    if (hasAnError(result)) {
        const responseCodes = {
            "Too many results.": "420",
            "Movie not found!": "404",
            "Keep typing": "418",
        };

        result.ResponseCode = responseCodes[result.Error];
    } else {
        result.ResponseCode = "200";
    }

    return result;
};

export const getPosterUrl = (movie) => {
    if (hasAPoster(movie)) {
        return movie.Poster;
    }

    return `//www.classicposters.com/images/nopicture.gif`;
};

export const getMoviePoster = (movie) => {
    const movieImage = getPosterUrl(movie);
    const movieCopy = movie;
    const { Title, imdbID } = movieCopy;
    const image = `<img src=${movieImage} alt='${Title}' id=${imdbID} class="poster" />`;

    return image;
};

export const findMovies = async (key, page = 1) => {
    let result = {};

    if (key) {
        result = await getSomeData(
            `http://www.omdbapi.com/?s=${key}&apikey=${OMDB_API_KEY}&page=${page}`
        );
    } else {
        result = { Response: "False", Error: "Keep typing" };
    }

    return generateResponseCode(result);
};

export const findMovie = async (imdbId) => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=short`
    );

    return result;
};
