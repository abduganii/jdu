import api from "./api"

export const RecruitorGet = async () => {
    try {
     const res = await api.get('/recruitors', {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
export const RecruitorGetById = async (id) => {
    try {
     const res = await api.get(`/recruitor/${id}`, {withCredentials: true})
     return res.data
    } catch (error) {
     console.log(error.response.data.message);
    }
}
 
export const RecruitorAdd = async (data) => { 
    const response = await api.post('/recruitor', data, {
        headers: {
        'Content-Type': "multipart/form-data"
    }});
    return response;
}

export const Recruitordelete = async (id) => {
    try {
        const response = await api.delete(`/recruitor/${id}`);
        return response;
       } catch (error) {
        console.log(error.response.data.message);
       }
}