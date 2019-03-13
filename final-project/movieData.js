import { OMDB_API_KEY } from "./credentials";
import { getSomeData } from "./network";

const hasAPoster = (movie) => movie.Poster !== "N/A";

const hasAnError = (result) => result.Response === "False";

export const getPosterUrl = (movie) => {
    if (hasAPoster(movie)) {
        return movie.Poster;
    }

    return `//www.classicposters.com/images/nopicture.gif`;
};

export const findMovies = async (key, page = 1) => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?s=${key}&apikey=${OMDB_API_KEY}&page=${page}`
    );

    if (hasAnError(result)) {
        // maybe here I could do something clever
        // return "";
    }

    return result;
};

export const findMovie = async (imdbId) => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=short`
    );

    console.log(result);

    return result;
};
