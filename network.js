import { createfetchUnlessCached } from "fetch-unless-cached";

export const getSomeData = async (url) => {
    const cachedFetch = createfetchUnlessCached(3600);

    return cachedFetch(url);
};
