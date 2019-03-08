import { findSomeMoviePosters } from "./movieData";

const searchResults = document.getElementById("search-results");
const searchTextField = document.getElementById("search-movies");
const searchButton = document.getElementById("search-button");

const addPosterBricks = async () => {
    const searchTerm = searchTextField.value;
    const moviePosters = await findSomeMoviePosters(searchTerm);

    searchResults.innerHTML = moviePosters.join("");
};

searchButton.onclick = addPosterBricks;
