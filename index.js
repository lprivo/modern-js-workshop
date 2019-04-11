import { findMovies, findMovie, getMoviePoster } from "./movieData";
import { createModal } from "./modalHelper";
import { debounce } from "./utils";

const searchResults = document.getElementById("search-results");
const errorField = document.getElementById("errors");
const searchTextField = document.getElementById("search-movies");

const state = {
    currentPage: 1,
    maxPage: 0,
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

const changeCurrentPage = (page) => {
    if (
        state.currentPage + page >= 1 &&
        state.currentPage + page <= state.maxPage
    )
        state.currentPage += page;

    debouncedGetMovies(true);
};

const prevButton = () => {
    const button = document.createElement("div");

    button.id = "prev";
    button.textContent = "<<< Prev <<<";
    button.onclick = () => changeCurrentPage(-1);

    return button;
};

const nextButton = () => {
    const button = document.createElement("div");

    button.id = "next";
    button.textContent = ">>> Next >>>";
    button.onclick = () => changeCurrentPage(1);

    return button;
};

const handlePaginatorButtons = () => {
    const paginatorDiv = document.createElement("div");

    paginatorDiv.id = "paginator";

    paginatorDiv.appendChild(prevButton());
    paginatorDiv.appendChild(nextButton());

    if (state.maxPage > 1) {
        if (!document.getElementById("paginator")) {
            searchResults.insertAdjacentElement("beforebegin", paginatorDiv);
        } else {
            console.log("paginator already in dom");
        }
    } else {
        paginatorDiv.remove();
    }

    // if (currentPage > 1) {
    //     console.log("currentPage: ", currentPage);
    //     if (!paginatorDiv.contains(prevButton())) {
    //         paginatorDiv.appendChild(prevButton());
    //     }
    // } else {
    //     prevButton().remove();
    // }

    // if (maxPage > currentPage) {
    //     if (!paginatorDiv.contains(nextButton())) {
    //         paginatorDiv.appendChild(nextButton());
    //     }
    // } else {
    //     nextButton().remove();
    // }
};

const fillScreenWithPosters = async (movies) => {
    if (movies && movies.Response !== "False") {
        const moviesList = movies.Search.map(getMoviePoster);

        searchResults.innerHTML = "";
        await moviesList.forEach((element) => {
            searchResults.append(element);
        });
        handlePaginatorButtons();

        return moviesList;
    }
    handlePaginatorButtons();
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
        .then(addEventListeners)
        .then(handlePaginatorButtons);
}, 500);

searchTextField.onkeyup = (event) => {
    event.preventDefault();
    debouncedGetMovies();
};

// paginator doesn't reset currentPage
// paginator doesn't remove buttons or the whole stuff from dom, when it should
// style the results
