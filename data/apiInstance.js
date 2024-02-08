import axios from 'axios';

export const boardApiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    headers: {
        'Content-type': 'application/json',
    },
    // withCredentials: true,
    // timeout: 2000,
    // maxRedirects: 0,
});

export const certApiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    headers: {},
});

export const ImageApiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FILE_SERVER_HOST}`,
    headers: {},
    params: {
        project: 0,
        folder: 'board',
    },
});

export default boardApiInstance;
