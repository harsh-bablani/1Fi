import axios from "axios"

// Treat an empty string as “unset” so the production default ("/api") is still used.
const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
const defaultBaseUrl = envBaseUrl || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api")

const API = axios.create({
    baseURL: defaultBaseUrl
})

export default API