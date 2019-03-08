import { findSomeMoviePosters } from "./movieData";

const searchResults = document.getElementById("search-results");
const searchTextField = document.getElementById("search-movies");
const form = document.getElementById("film-search-form");

const addPosterBricks = async () => {
    const searchTerm = searchTextField.value;
    const moviePosters = await findSomeMoviePosters(searchTerm);

    searchResults.innerHTML = moviePosters.join("");
};

form.onsubmit = (event) => {
    event.preventDefault();
    addPosterBricks();
};
