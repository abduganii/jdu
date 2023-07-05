import api from "./api"

export const GetNewsCategory = async () => {
    try {
        const res = await api.get(`/news_categories`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const GetNews = async (query) => {
    try {
        const searchParams = new URLSearchParams(query)
        const res = await api.get(`/news/published?${searchParams?.toString()}`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error.response?.data?.message);
    }
}
export const SearchNews = async (query) => {
    try {
        const searchParams = new URLSearchParams(query)
        const res = await api.get(`/news?${searchParams?.toString()}`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error.response.data.message);
    }
}
export const GetNewsById = async (id) => {
    try {
        const res = await api.get(`/news/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const NewsAdd = async (data) => {
    const response = await api.post('/news', data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });
    return response;
}

export const getNewsCategories = async () => {
    try {
        const res = await api.get('/news_categories')
        return res?.data
    } catch (error) {
        console.log(error);
    }
}