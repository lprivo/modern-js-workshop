export const debounce = (func, wait, immediate) => {
    let timeout;

    return (...args) => {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func(...args);
    };
};
