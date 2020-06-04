import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-d3844.firebaseio.com/'
});

export default instance;