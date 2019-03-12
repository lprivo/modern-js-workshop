import { findMovies, findMovie, getPosterUrl } from "./movieData";

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
    const movieImdb = movie.imdbID;
    const image = `<img src=${movieImage} alt='${movieTitle}' id=${movieImdb} class="poster" />`;

    return image;
};

const createPosterImg = async (movies) => {
    const moviesList = movies.Search.map(createMoviesHtml);

    searchResults.innerHTML = await moviesList.join("");

    return moviesList;
};

const addEventListeners = () => {
    document.querySelectorAll(".poster").forEach((item) => {
        item.onclick = () => {
            findMovie(item.id);
        };
    });
};

form.onsubmit = async (event) => {
    event.preventDefault();
    await getMovies()
        .then(createPosterImg, (error) => {
            console.log("error with movies", error);
        })
        .then(addEventListeners);
};

// add pagination
// style the results
// add validation
