import { findMovies, findMovie, getPosterUrl } from "./movieData";
import { debounce } from "./utils";

const searchResults = document.getElementById("search-results");
const errorField = document.getElementById("errors");
const searchTextField = document.getElementById("search-movies");

const setErrorMessage = (errorCode, errorMessage) => {
    if (errorCode !== "200") {
        errorField.innerHTML = `<h2>${errorMessage}</h2>`;
    } else {
        errorField.innerHTML = "";
    }
};

const getMovies = async () => {
    const searchTerm = searchTextField.value;

    const movies = await findMovies(searchTerm);

    // maybe if something clever is done in findMovies, I wouldn't need all this here

    setErrorMessage(movies.ResponseCode, movies.Error);

    return movies;
};

const createMoviesHtml = (movie) => {
    const movieImage = getPosterUrl(movie);
    const movieCopy = movie;
    const { Title, imdbID } = movieCopy;
    const image = `<img src=${movieImage} alt='${Title}' id=${imdbID} class="poster" />`;

    return image;
};

const createPosterImg = async (movies) => {
    if (movies && movies.Response !== "False") {
        const moviesList = movies.Search.map(createMoviesHtml);

        searchResults.innerHTML = await moviesList.join("");

        return moviesList;
    }
    searchResults.innerHTML = "";

    return ``;
};

const addEventListeners = () => {
    document.querySelectorAll(".poster").forEach((item) => {
        item.onclick = () => {
            findMovie(item.id);
        };
    });
};

const debouncedGetMovies = debounce(() => {
    getMovies()
        .then(createPosterImg)
        .then(addEventListeners);
}, 500);

// form.onsubmit = async (event) => {
searchTextField.onkeyup = (event) => {
    event.preventDefault();
    // getMovies()
    //     .then(createPosterImg)
    //     .then(addEventListeners);
    debouncedGetMovies();
};

// add pagination
// style the results
