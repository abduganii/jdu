import api from "./api";

export const GetCertificates = async () => {
  try {
    const res = await api.get(`/students/certificates-count`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const GetCridents = async () => {
  try {
    const res = await api.get(`/credits`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
