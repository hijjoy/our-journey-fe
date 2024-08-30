import axios from 'axios';

import { getCookie } from '@/utils/cookie';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await Promise.resolve(getCookie('accessToken'));
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
