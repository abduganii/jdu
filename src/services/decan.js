import api from "./api"

export const DecanUpdate = async ( data ) => { 
    const response = await api.put(`/decan`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}


export const CanactUpdate = async ( data ,id) => { 
    const response = await api.put(`/infos/${id}`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}


export const CanactGet = async () => {
    try {
    const res = await api.get(`/infos`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message)
    } 
}