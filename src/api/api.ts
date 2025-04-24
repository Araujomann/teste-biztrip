import axios from "axios";

export const api = axios.create({
    baseURL: "https://blessed-butterfly-iiwpx0r4geze.on-vapor.com/api/v1",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("@biztrip:token")
    if(token) {
        config.headers
        .Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status === 401) {
       localStorage.removeItem("@biztrip:token")

       if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error)
})