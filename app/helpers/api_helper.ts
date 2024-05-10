import axios from 'axios';
const api = axios.create({
    baseURL: process.env.DATABASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});