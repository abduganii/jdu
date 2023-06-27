import api from "./api"

export const DecanUpdate = async ( data ) => { 
    const response = await api.put(`/decan`, data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}
