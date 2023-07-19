import axios from "axios";
import { QueryClient } from "react-query";

const api = axios.create({
    baseURL: "http://3.96.52.48/",
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

  export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

export default api;