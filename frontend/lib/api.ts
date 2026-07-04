import axios from 'axios';

export const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const teamApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TEAM_SERVICE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const submissionApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUBMISSION_SERVICE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const notificationApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const authInterceptor = (config: any) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
};

authApi.interceptors.request.use(authInterceptor);
teamApi.interceptors.request.use(authInterceptor);
submissionApi.interceptors.request.use(authInterceptor);
notificationApi.interceptors.request.use(authInterceptor);