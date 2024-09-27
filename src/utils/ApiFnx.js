import axiosInstance from "./axios";

const handleFormDataPostRequest = async (url) => {
    const res = await axiosInstance.post(url, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });

    return res;
}

const handleGetRequest = async (url) => {
    const res = await axiosInstance.get(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return res;
}

const handlePostRequest = async (url) => {
    const res = await axiosInstance.post(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return res;
}

const handlePutRequest = async (url) => {
    const res = await axiosInstance.put(url, payload, {
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return res;
}

export { handleFormDataPostRequest, handleGetRequest, handlePostRequest, handlePutRequest };