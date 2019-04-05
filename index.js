import { findMovies, findMovie, getMoviePoster } from "./movieData";
import { createModal } from "./modalHelper";
import { debounce } from "./utils";

const searchResults = document.getElementById("search-results");
const errorField = document.getElementById("errors");
const searchTextField = document.getElementById("search-movies");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const state = {
    currentPage: 1,
    maxPage: 2,
};

const setMaxPage = (results) => {
    state.maxPage = Math.ceil(results / 10);
};

const setErrorMessage = (errorCode, errorMessage) => {
    if (errorCode !== "200") {
        errorField.innerHTML = `<h2>${errorMessage}</h2>`;
    } else {
        errorField.innerHTML = "";
    }
};

const getMovies = async () => {
    const searchTerm = searchTextField.value;
    const movies = await findMovies(searchTerm, state.currentPage);
    const { ResponseCode, Error, totalResults } = movies;

    setMaxPage(totalResults);

    setErrorMessage(ResponseCode, Error);

    return movies;
};

const fillScreenWithPosters = async (movies) => {
    if (movies && movies.Response !== "False") {
        const moviesList = movies.Search.map(getMoviePoster);

        searchResults.innerHTML = "";
        await moviesList.forEach((element) => {
            searchResults.append(element);
        });

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

searchTextField.onkeyup = (event) => {
    event.preventDefault();
    debouncedGetMovies();
};

const changeCurrentPage = (page) => {
    const { currentPage, maxPage } = state;

    if (page + currentPage >= 1 && page + currentPage <= maxPage) {
        state.currentPage += page;
        // get movies instantly with true flag
        debouncedGetMovies(true);
    }

    console.log("currentPage", currentPage);
    console.log("maxpage", maxPage);
};

prev.onclick = () => changeCurrentPage(-1);
next.onclick = () => changeCurrentPage(1);

// style the results
