import { OMDB_API_KEY } from "./credentials";
import { getSomeData } from "./network";

export const hasAPoster = (movie) => movie.Poster !== "N/A";

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
    console.log(result);

    return result;
};

export const findMovie = async (imdbId) => {
    const result = await getSomeData(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=short`
    );
    console.log(result);
    return result;
};
