import axios from 'axios';

/**
 *  Create a mock api to server the data through an API call using: https://app.wiremock.cloud/
 *      Using a free trail version that will
 *      Hence this API will be deprecated after 2/28/2024
 */

const BASE_URL = 'https://9v5gl.wiremockapi.cloud/';

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})