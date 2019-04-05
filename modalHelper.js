import { getMoviePoster } from "./movieData";
import tingle from "tingle.js";

const getModalContentFromMovie = (movie) => {
    const modalContent = {
        title: `<h2 class="title">${movie.Title}</h2>`,
        year: `<p  class="year">Year: ${movie.Year}</p>`,
        language: `<p  class="language">Language: ${movie.Language}</p>`,
        plot: `<p  class="plot">Plot: ${movie.Plot}</p>`,
        poster: getMoviePoster(movie).outerHTML,
        imdRating: `<p  class="imdbRating">IMDB rating: ${
            movie.imdbRating
        }</p>`,
    };

    return modalContent;
};

export const createModal = async (movie) => {
    // logging out the movie, just to see if there is anything we want to show
    console.log("movie", movie);

    // instanciate new modal
    // eslint-disable-next-line new-cap
    const modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ["overlay", "button", "escape"],
        closeLabel: "Close",
        onClose: () => {
            modal.destroy();
        },
    });

    const modalContent = getModalContentFromMovie(movie);

    // set content
    modal.setContent(Object.values(modalContent).join(""));

    // add a button
    modal.addFooterBtn("Close", "tingle-btn tingle-btn--primary", () => {
        modal.close();
    });

    modal.open();
};
