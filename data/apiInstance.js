import axios from 'axios';

const apiInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    headers: {
        'Content-type': 'application/json',
    },
    // withCredentials: true,
    // timeout: 2000,
    // maxRedirects: 0,
});

export default apiInstance;
