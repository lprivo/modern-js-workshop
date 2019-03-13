import { findMovies, findMovie, getPosterUrl } from "./movieData";

const searchResults = document.getElementById("search-results");
const errorField = document.getElementById("errors");
const searchTextField = document.getElementById("search-movies");

const getMovies = async () => {
    if (searchTextField.value) {
        const searchTerm = searchTextField.value;
        const movies = await findMovies(searchTerm);

        if (movies.Response === "False") {
            errorField.innerHTML = `<h2>${movies.Error}</h2>`;
            searchResults.innerHTML = "";
        } else {
            errorField.innerHTML = "";
        }

        return movies;
    }
    errorField.innerHTML = `<h2>Keep Typing</h2>`;

    return null;
};

const createMoviesHtml = (movie) => {
    const movieImage = getPosterUrl(movie);
    const movieTitle = movie.Title;
    const movieImdb = movie.imdbID;
    const image = `<img src=${movieImage} alt='${movieTitle}' id=${movieImdb} class="poster" />`;

    return image;
};

const createPosterImg = async (movies) => {
    if (movies && movies.Response !== "False") {
        const moviesList = movies.Search.map(createMoviesHtml);

        searchResults.innerHTML = await moviesList.join("");

        return moviesList;
    }

    return ``;
};

const addEventListeners = () => {
    document.querySelectorAll(".poster").forEach((item) => {
        item.onclick = () => {
            findMovie(item.id);
        };
    });
};

// form.onsubmit = async (event) => {
searchTextField.onkeyup = async (event) => {
    event.preventDefault();
    getMovies()
        .then(createPosterImg)
        .then(addEventListeners);
};

// add pagination
// style the results
