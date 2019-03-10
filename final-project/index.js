import { findMovies, getPosterUrl } from "./movieData";

const searchResults = document.getElementById("search-results");
const searchTextField = document.getElementById("search-movies");
const form = document.getElementById("film-search-form");

const getMovies = async () => {
    const searchTerm = searchTextField.value;

    return findMovies(searchTerm);
};

const createMoviesHtml = (movie) => {
    const movieImage = getPosterUrl(movie);
    const movieTitle = movie.Title;
    const image = `<img src=${movieImage} alt=${movieTitle} />`;
    const entry = `<a href="" >${image}</a>`;

    return entry;
};

const createPosterImg = async (movies) => {
    const moviesList = movies.Search.map(createMoviesHtml).join("");

    searchResults.innerHTML = await moviesList;
};

form.onsubmit = async (event) => {
    event.preventDefault();
    const movies = await getMovies();

    createPosterImg(movies);
};

// add pagination
// style the results
// add validation
