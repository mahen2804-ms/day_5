import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://a268-27-62-255-79.ngrok.io',
  timeout: 3000,
  timeoutErrorMessage: 'Server down.. Please try after sometime.',
});

export default axiosInstance;
