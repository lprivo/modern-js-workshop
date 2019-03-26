import { findMovies, findMovie, getMoviePoster } from "./movieData";
import { debounce } from "./utils";
import tingle from "tingle.js";

const createModal = async (imdbID) => {
    const movie = await findMovie(imdbID);

    // logging out the movie, just to see if there is anything we want to show
    console.log("movie", movie);

    // instanciate new modal
    // eslint-disable-next-line new-cap
    const modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ["overlay", "button", "escape"],
        closeLabel: "Close",
        // cssClass: ["custom-class-1", "custom-class-2"],
        onClose: () => {
            modal.destroy();
        },
    });

    const modalContent = {
        title: `<h2 class="title">${movie.Title}</h2>`,
        year: `<p  class="year">Year: ${movie.Year}</p>`,
        language: `<p  class="language">Language: ${movie.Language}</p>`,
        plot: `<p  class="plot">Plot: ${movie.Plot}</p>`,
        poster: getMoviePoster(movie),
        imdRating: `<p  class="imdbRating">IMDB rating: ${
            movie.imdbRating
        }</p>`,
    };

    // set content
    modal.setContent(Object.values(modalContent).join(""));

    // add a button
    modal.addFooterBtn("Close", "tingle-btn tingle-btn--primary", () => {
        modal.close();
    });

    modal.open();
};

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
        item.onclick = () => {
            createModal(item.id);
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

// add pagination
// style the results
