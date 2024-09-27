import axios from 'axios';

const axiosInstance = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/` });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    // Add query parameters
    const params = {
      county: localStorage.getItem('tennant') ? localStorage.getItem('tennant') : '',
      ...config.params,
    };

    config.params = params;

    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
