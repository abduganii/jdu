import axios from "axios";

const api = axios.create({
    baseURL: "https://api.jdu.getter.uz/",
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

export default api;