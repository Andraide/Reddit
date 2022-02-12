import { handleResponse } from "../_helpers/handle-response";


export const memesService = {
    getMemes,
}


async function getMemes() {
    const url = 'https://www.reddit.com/r/chile/new/.json?limit=100'

    const requestOptions = {
        method: 'GET',
        timeoutInterval: 15000,
    }

    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(memes => {
                return Promise.resolve(memes)
            }).catch((err) => {
                const { status } = err
                return Promise.reject(err)
            })
}
