import { findMovies, findMovie, getMoviePoster } from "./movieData";
import { createModal } from "./modalHelper";
import { debounce } from "./utils";

const searchResults = document.getElementById("search-results");
const errorField = document.getElementById("errors");
const searchTextField = document.getElementById("search-movies");
const paginator = document.getElementById("paginator");
let currentPage = 1;
let thereIsMore = false;

const setErrorMessage = (errorCode, errorMessage) => {
    if (errorCode !== "200") {
        errorField.innerHTML = `<h2>${errorMessage}</h2>`;
    } else {
        errorField.innerHTML = "";
    }
};

const getMovies = async () => {
    const searchTerm = searchTextField.value;
    const movies = await findMovies(searchTerm, currentPage);

    setErrorMessage(movies.ResponseCode, movies.Error);

    return movies;
};

const fillScreenWithPosters = async (movies) => {
    if (movies && movies.Response !== "False") {
        const moviesList = movies.Search.map(getMoviePoster);

        searchResults.innerHTML = await moviesList.join("");

        return moviesList;
    }
    searchResults.innerHTML = "";

    return ``;
};

const addEventListeners = () => {
    document.querySelectorAll(".poster").forEach((item) => {
        item.onclick = async () => {
            createModal(await findMovie(item.id));
        };
    });
};

const debouncedGetMovies = debounce(() => {
    getMovies()
        .then(fillScreenWithPosters)
        .then(addEventListeners);
}, 500);

const goToPage = (page = 1) => {
    currentPage += page;
    getMovies()
        .then(fillScreenWithPosters)
        .then(addEventListeners);
};

// doesn't work yet
const addPaginator = () => {
    const pageButtons = {};

    if (currentPage > 1) {
        pageButtons.previousButton = `<div id="previous-page">Previous Page</div>`;
    }

    if (thereIsMore) {
        console.log("thereIsMore", thereIsMore);

        pageButtons.nextButton = `<div id="next-page">Next Page</div>`;
    }
    paginator.innerHTML = Object.values(pageButtons).join("");

    document.getElementById("previous-page").onClick(goToPage);
    document.getElementById("next-page").onClick(goToPage);
};

searchTextField.onkeyup = (event) => {
    event.preventDefault();
    debouncedGetMovies();
    // addPaginator();
};

// add pagination
// style the results
